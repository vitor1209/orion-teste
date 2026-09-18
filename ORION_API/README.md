# ORION_API

API de visao computacional para apoio a reabilitacao fisico-motora e cognitiva por meio da musica.

O sistema detecta gestos de mao em tempo real, classifica esses gestos como notas musicais e transmite o resultado para clientes conectados. A proposta e apoiar praticas terapeuticas e educacionais com base teorica musical, tornando a interacao mais ludica e orientada por feedback em tempo real.

## Objetivo

Promover experiencias de reabilitacao e aprendizagem musical por meio de:

- Estimulo motor fino e coordenacao atraves de gestos manuais.
- Estimulo cognitivo atraves da associacao entre gesto, nota, ritmo e resposta visual.
- Suporte a atividades com pessoas no espectro e outros contextos de desenvolvimento/rehabilitacao.

## Escopo deste repositorio

Este repositorio contem o backend (API) responsavel por:

- Receber frames de video enviados pelo cliente.
- Detectar landmarks da mao com MediaPipe.
- Classificar gestos em notas musicais.
- Retornar frames processados com marcacoes.
- Enviar notas detectadas via WebSocket.

## Arquitetura resumida

Fluxo principal:

1. Cliente envia frame da camera para o WebSocket de video.
2. Deteccao de mao e landmarks (MediaPipe HandLandmarker).
3. Classificacao da configuracao dos dedos em nota musical.
4. Publicacao da nota no WebSocket para clientes conectados.
5. Retorno do frame com marcacoes para o cliente de video.

Componentes principais:

- app/main.py: inicializacao do FastAPI, CORS, rotas e servico de video.
- app/services/video_stream.py: loop de captura/processamento e envio de nota.
- app/cv/detector.py: configuracao do detector MediaPipe.
- app/services/Identificador.py: identifica a nota a partir das regras.
- app/config/Regras.py: regras de gesto para cada nota.
- app/routes/video.py: stream de video.
- app/routes/websocket.py: canal WebSocket para envio de notas.
- app/routes/root.py: endpoint de status.

## Notas suportadas

Atualmente o classificador reconhece:

- do
- re
- mi
- fa
- sol
- la
- si
- reset

Se nenhum gesto valido for encontrado, o retorno de nota pode ser reset.

## Endpoints

### GET /

Health check basico.

Resposta esperada:

```json
{
	"message": "Ok"
}
```

### WebSocket /video

Recebe frames de video em bytes e retorna o frame processado em JPEG com as deteccoes
desenhadas.

Uso comum:

- O frontend captura a camera do usuario.
- Cada frame e enviado como mensagem binaria para `/video`.
- A API responde com uma mensagem binaria contendo o JPEG anotado.

Conecte informando a sessao do aparelho: `/api/v1/video?sessao=<id>`. As notas detectadas
nesse stream sao entregues apenas ao cliente de `/ws` conectado com a mesma sessao. Logo
apos o accept, o servidor envia `{"type": "sessao", "sessao": "<id>"}`.

Se o frame recebido passar do limite configurado em `ORION_MAX_FRAME_BYTES`, a conexao e
fechada com codigo WebSocket `1009`.

### WebSocket /ws

Canal de envio de nota em tempo real para um unico aparelho.

Conecte informando a sessao do aparelho: `/api/v1/ws?sessao=<id>`. O `<id>` deve ser gerado
uma vez por aparelho no frontend (por exemplo `crypto.randomUUID()` guardado no
`localStorage`) e usado tanto em `/ws` quanto em `/video`.

- Existe no maximo uma conexao `/ws` por sessao: ao reconectar com a mesma sessao, a conexao
  anterior e fechada com o codigo WebSocket `1012`.
- Uma nota so e entregue a sessao que a gerou; nenhuma nota e enviada em broadcast.
- Se a sessao nao for informada, o servidor gera uma e a devolve em
  `{"type": "sessao", "sessao": "<id>"}`; enquanto o mesmo id nao for usado tambem em
  `/video`, as notas desse stream sao descartadas.

Payload enviado pelo servidor:

```json
{
	"nota": "C3"
}
```

Observacao importante:

- O servidor envia a nota quando ela permanece estavel por pelo menos 0.2 segundos.

## Requisitos

- Python 3.11
- Webcam funcional
- Ambiente com suporte a OpenCV/MediaPipe

Dependencias Python em requirements.txt:

- fastapi[standard]==0.113.0
- pydantic==2.8.0
- mediapipe==0.10.33

## Instalacao e execucao local

1. Criar e ativar ambiente virtual.
2. Instalar dependencias.
3. Executar a API.

Exemplo com venv no Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
fastapi run app/main.py
```

Por padrao, a API inicia em:

- http://127.0.0.1:8000

Documentacao interativa padrao do FastAPI (se habilitada no ambiente):

- http://127.0.0.1:8000/docs

## Execucao com Docker

Build da imagem:

```bash
docker build -t orion-api .
```

Execucao do container (porta 8000 do host para porta 8000 do container):

```bash
docker run --rm -p 8000:8000 orion-api
```

Acesso:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/video

Em plataformas que injetam a porta por variavel de ambiente:

```bash
docker run --rm -p 8080:8080 -e PORT=8080 orion-api
```

## Configuracoes

Configuraveis por variavel de ambiente:

- ORION_CORS_ORIGINS: origens permitidas para HTTP e WebSocket, separadas por virgula.
- ORION_MODEL_PATH: caminho do modelo MediaPipe.
- ORION_ENABLE_DOCS: use false para desabilitar /docs e /openapi.json em producao.
- ORION_MAX_FRAME_BYTES: tamanho maximo aceito para cada frame recebido por WebSocket.
- ORION_JPEG_QUALITY: qualidade do JPEG retornado, de 1 a 100.
- ORION_WS_SEND_TIMEOUT_SECONDS: tempo maximo para envio de nota a cada cliente WebSocket.
- PORT: porta usada pelo container.

Valores padrao atuais:

- Modelo: app/Modelos/hand_landmarker.task
- Deteccao de maos simultaneas: 1
- Thresholds de confianca do detector: 0.8
- Janela minima para confirmar nota: 0.2 segundos
- Tamanho maximo de frame: 2000000 bytes
- Desenho de debug: desabilitado
- Qualidade JPEG: 70
- Timeout de envio WebSocket: 1.0 segundo
- CORS permitido para frontend local: localhost:5179 e 127.0.0.1:5179

## Observacoes para publicacao

- Nao publique arquivos .env, chaves privadas, certificados, bancos locais ou caches Python.
- Configure `ORION_CORS_ORIGINS` com o dominio real do frontend antes de publicar.
- Configure `ORION_ENABLE_DOCS=false` se nao quiser expor `/docs` e `/openapi.json`.
- Conexoes WebSocket de origens fora de `ORION_CORS_ORIGINS` sao recusadas com codigo `1008`.
- Se a API ficar exposta na internet, proteja /video, /video/stop e /ws com autenticacao ou restrinja a rede. Hoje qualquer cliente que alcance a API pode processar frames, parar o detector e conectar ao WebSocket.

## Solucao de problemas

### Camera nao abre

- Verifique se outra aplicacao nao esta usando a webcam.
- Confirme permissao de camera no sistema operacional.
- Em ambiente virtualizado/container, valide acesso ao dispositivo.

### Modelo nao encontrado

- Confirme a existencia do arquivo app/Modelos/hand_landmarker.task.
- Se estiver faltando, ajuste o caminho ou adicione o arquivo no local esperado.

### Nao detecta gesto com estabilidade

- Melhore iluminacao do ambiente.
- Ajuste distancia da mao para caber inteira no frame.
- Evite movimentos bruscos durante a formacao do gesto.

### Frontend sem receber no WebSocket

- Verifique se a conexao em /ws foi estabelecida com sucesso.
- Confirme se o cliente permanece conectado.
- Valide regras de CORS e origem do frontend.
