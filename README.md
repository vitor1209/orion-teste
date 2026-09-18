# ORION — ambiente de teste offline

Esta pasta roda a plataforma ORION inteira na máquina local, **sem internet**: banco em
arquivo, modelo de visão computacional local e nenhuma chamada para serviço externo.

```
orion-teste/
├── ORION_API/            API FastAPI + MediaPipe (repositório git próprio)
├── orion-web/            Front React 19 + Vite (repositório git próprio)
├── iniciar-offline.bat   Sobe os dois (duplo clique)
└── iniciar-offline.ps1   O script de verdade
```

## Como rodar

Duplo clique em **`iniciar-offline.bat`**.

Ele abre duas janelas (API e front), espera o Vite subir e abre o navegador.
Para parar, feche as duas janelas.

| Serviço | Endereço |
|---------|----------|
| Front | http://localhost:5173 |
| API | http://localhost:8000 |
| Documentação da API | http://localhost:8000/docs |

### Login

A plataforma tem **um usuário fixo**, criado sozinho na primeira subida:

```
E-mail: orion@orion.com
Senha:  orion123
```

Cadastro de novos usuários continua funcionando (grava no banco local), mas não é
necessário para usar nada.

## Preparo inicial (uma vez só, com internet)

O script faz isso sozinho se estiver faltando, mas se quiser adiantar:

```bash
ORION_API/venv/Scripts/python.exe -m pip install aiosqlite
```

`aiosqlite` é o driver do banco local — é a **única** dependência que ainda não estava
instalada no `venv`. O `node_modules` do front já está na pasta. Depois disso, nada mais
toca a rede.

## O que roda offline

- **Câmera / Manossolfa** — o MediaPipe usa o modelo `hand_landmarker.task` que já está em
  `ORION_API/app/modules/vision/Modelos/`. Os frames vão e voltam pelo WebSocket local
  `/api/v1/video`, e as notas detectadas chegam por `/api/v1/ws`.
- **Trilha de atividades e progresso** — as 24 atividades e o progresso ficam no SQLite local.
- **Sons, vídeos e imagens de exemplo** — todos são assets do próprio front.
- **Luva** — usa Web Serial (porta USB), nunca dependeu de rede.
- **Loja, Perfil e Finalizar Pedido** — já eram mockados com Faker no front.

## Sem tempo de sessão

No modo offline nada expira. Três relógios foram desligados pelo `ORION_API/.env`:

| Variável | Offline | Padrão | O que acontecia com o padrão |
|----------|---------|--------|------------------------------|
| `ACCESS_TOKEN_EXPIRE_MINUTES` | 1 ano | 30 min | O token vencia, a API devolvia 401 e o front deslogava o usuário sozinho |
| `ORION_WS_IDLE_TIMEOUT_SECONDS` | 1 ano | 300 s | O `/ws` fechava e **as notas paravam de chegar em silêncio** — o front nunca envia nada por esse canal e não reconecta |
| `ORION_WS_HEARTBEAT_SECONDS` | 1 ano | 180 s | O heartbeat chegava no `/video` como texto e o front o tratava como JPEG, fazendo a imagem piscar |

Para voltar aos padrões de produção, remova essas três linhas do `.env`.

## Banco de dados

SQLite, no arquivo `ORION_API/orion_local.db`. Ele é criado e populado sozinho no startup
da API, a partir de `ORION_API/app/seed_offline.py`.

O seed é **idempotente**: só insere o que ainda não existe. Para zerar a demo, pare a API,
apague `orion_local.db` e suba de novo — o banco se recria do zero.

O seed cria:

- 2 tipos de domínio e 6 domínios (categorias `Escala` / `Intervalo` / `Melodia` / `Gestos`,
  e tipos de interação `Manossolfa` / `Luva`);
- as 24 atividades, com os mesmos `Id`, `Chave` e `Ordem` do banco de produção;
- o usuário fixo.

> As descrições das atividades vieram de um dump que estava truncado no meio da frase.
> As frases foram completadas de forma plausível — se quiser o texto original exato, é só
> substituir em `app/seed_offline.py`.

### Voltar a apontar para o MySQL da Railway

Em `ORION_API/.env`, comente a linha do SQLite e descomente a do MySQL logo abaixo dela.
Vale também colocar `ORION_SEED_OFFLINE=false` para o startup não tentar semear nada lá.

## Atividades implementadas no front

Das 24 atividades da trilha, **4 chaves** têm tela implementada
(`orion-web/src/pages/Atividades/Atividade.utils.ts`):

| Chave | Tela |
|-------|------|
| `manossolfa-gesto-camera` | Conhecendo a Manossolfa — 4ª oitava |
| `manossolfa-gesto-camera-pt2` | Conhecendo a Manossolfa — 5ª oitava |
| `manossolfa-gesto-camera-pt3` | Conhecendo a Manossolfa — 3ª oitava |
| `introducao-escala-do-maior-manossolfa` | Introdução à escala de Dó Maior |

As outras aparecem na trilha e abrem a tela "atividade indisponível" — mesmo
comportamento de hoje em produção.

## Rodando na mão, sem o script

```bash
cd ORION_API
venv/Scripts/python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

```bash
cd orion-web
npm run dev
```

## Configuração

| Arquivo | Versionado? | Para que serve |
|---------|-------------|----------------|
| `ORION_API/.env` | não | `DATABASE_URL`, `SECRET_KEY`, config da visão computacional |
| `ORION_API/.env.example` | sim | Modelo do arquivo acima |
| `orion-web/.env` | sim | Aponta para a API publicada na Railway — **não mexer** |
| `orion-web/.env.local` | não | Sobrescreve o de cima com `http://localhost:8000` |

O `.env.local` é o que faz o front falar com a API local. Ele também resolve os WebSockets
de câmera: `src/utils/sessaoWebSocket.ts` deriva a URL de `ws://` a partir dessa mesma base.

---

## ⚠️ Pendência de segurança

O `ORION_API/.env` desta pasta tem, em texto puro, a **senha do MySQL de produção** e a
**`SECRET_KEY`** que assina os tokens JWT. As duas ficaram expostas em uma pasta dentro do
OneDrive. Vale rotacionar ambas na Railway quando der — nada aqui depende delas para
funcionar offline.
