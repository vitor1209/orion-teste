# Project Instructions

## Princípios Gerais
- Seguir o design system existente, a hierarquia visual e a consistência de UI.
- Manter a UI limpa, acessível e amigável ao usuário.
- Todo texto voltado ao usuário deve estar em **Português Brasileiro (pt-BR)**.
- Nomes de componentes, variáveis, props, funções e arquivos devem estar em **português**, exceto: nomes de bibliotecas/APIs externas (`gsap`, `ScrollTrigger`, `useState`), e classes CSS usadas como seletor de animação (ex.: `home-hero-title` para GSAP).
- Entregar soluções robustas, seguras, manuteníveis e prontas para produção.
- Usar apenas bibliotecas e ferramentas modernas, estáveis e atualizadas.
- Nunca adivinhar implementações. Em caso de dúvida, consultar a documentação oficial.
- Responder de forma concisa; evitar repetição e preenchimento.
- Não usar Lodash ou qualquer utilitário baseado em Lodash — preferir APIs nativas do JavaScript/TypeScript.
- **Regra de manutenibilidade:** se uma implementação customizada aumentar significativamente a complexidade de manutenção, avaliar bibliotecas bem conhecidas, modernas e amplamente adotadas. Preferir uma biblioteca de reputação a reinventar, desde que alinhada com a stack do projeto.
- **Evitar repetição de código:** ao identificar padrões visuais ou de comportamento repetidos entre variantes/componentes, extrair em mixins, funções utilitárias ou props reutilizáveis em vez de duplicar blocos de estilo/lógica.

## Git & Commits
- Nunca sugerir mensagens de commit.

---

## Stack Técnica
- **React 19** com **React Compiler** (otimizações automáticas — ver seção "React Compiler" abaixo para como está configurado)
- **MUI (Material UI v9)** para componentes base
- **@/components** — componentes internos de UI (sempre têm prioridade)
- **React Hook Form** para formulários
- **Zod v4** para validação
- **TanStack Query (React Query v5)** para estado de servidor
- **Axios** para requisições HTTP (`src/api/Axios.ts` já configurado com `baseURL`, mas nenhum controller usa ainda — todos seguem 100% mockados com Faker, ver seção "Controllers")
- **date-fns** para manipulação de datas (instalado, ainda não usado em nenhum arquivo — sem padrão de uso estabelecido ainda)
- **Jotai** para estado global (instalado, ainda não usado em nenhum arquivo — sem padrão de uso estabelecido ainda)
- **Framer Motion** e/ou **GSAP** para animações
- **lucide-react** para ícones
- **@faker-js/faker** para mockar dados de API em desenvolvimento

---

## Padrões de Nomenclatura

### Arquivos e Pastas
| Tipo | Formato | Exemplo |
|------|---------|---------|
| Components | PascalCase | `MeuComponente/` |
| Páginas | PascalCase | `Dashboard/`, `SelecaoAtividade/` |
| Controllers | PascalCase (nome da página/domínio) | `Loja.ts`, `FinalizarPedido.ts`, `Auth.ts` |
| Models | PascalCase (nome da página/domínio) | `Loja.types.ts`, `FinalizarPedido.types.ts`, `Auth.types.ts` |
| Hooks | camelCase com `use` | `useDashboard.ts` |

### Código
| Tipo | Formato | Exemplo |
|------|---------|---------|
| Components | PascalCase | `const MeuComponente = ()` |
| Types/Interfaces | PascalCase | `type FiltrarProps`, `interface Tarefa` |
| Props | PascalCase + `Props` | `type HeaderProps` |
| Hooks | camelCase com `use` | `const useDashboard = ()` |
| Funções | camelCase | `const formatarData = ()` |
| Constantes | SCREAMING_SNAKE_CASE | `const FILTRO_INICIAL` |
| Enums | PascalCase | `enum GraficoSelecionado` |
| Query Keys | PascalCase (enum) | `enum DashboardQueryKeys` |

---

## Estrutura de Arquivos

### Padrão por Responsabilidade (componentes e páginas)
```plaintext
NomeComponente/
├── NomeComponente.tsx          # Estrutura visual (JSX/MUI)
├── NomeComponente.hook.tsx     # Lógica (estados, queries, handlers)
├── NomeComponente.types.ts     # Types, interfaces, props, enums locais
├── NomeComponente.utils.ts     # Funções utilitárias, records, formatadores
├── NomeComponente.schema.ts    # Schema Zod para validação de form
├── NomeComponente.styles.ts    # Estilos (SxProps<Theme>)
├── components/                 # Componentes internos da página
├── drawers/                    # Drawers (filtros, formulários laterais)
├── modais/                     # Modais (confirmação, sucesso, etc)
├── tabs/                       # Abas da página
└── pages/                      # Subpáginas
```

> Nota: a pasta de componentes extraídos de uma página é `components/` (em inglês), mesmo o restante dos nomes do projeto seguindo português — é a convenção real usada em todas as páginas atuais (`FinalizarPedido/components`, `Home/components`, `Loja/components`, etc.).

Nem todo componente precisa de todos os arquivos — criar apenas os que fizerem sentido (`.hook.tsx` só se houver estado/lógica; `.utils.ts` só se houver dados/formatadores; `.schema.ts` só em formulários).

### `.tsx` — Estrutura Visual
- Apenas JSX e estrutura com MUI. Chama o hook para obter dados e handlers. **Sem lógica de negócio.**
- Componente declarado como `const NomeComponente = (props) => { ... }`, nunca `function`.
- **Não usar comentários** — código deve ser autoexplicativo.

```tsx
export const Dashboard = () => {
    const { filtro, setFiltro, modais, toggleModal, dadosGrafico } = useDashboard()
    return (
        <>
            <Stack gap={4}>
                <Header toggleModal={toggleModal} />
                <Graficos dados={dadosGrafico} />
            </Stack>
            <Filtrar open={modais.filtrar} onClose={() => toggleModal("filtrar", false)} filtro={filtro} setFiltro={setFiltro} />
        </>
    )
}
```

### `.hook.tsx` — Lógica
Ordem obrigatória de declaração:
1. `useState` no topo
2. Hooks de biblioteca (`useModal`, `useParams`, etc.)
3. Queries (TanStack Query)
4. Variáveis derivadas
5. Métodos/handlers
6. `useEffect` por último (apenas para side effects reais)

Retorna um objeto com tudo que o componente `.tsx` precisa.

```tsx
export const useDashboard = () => {
    const [filtro, setFiltro] = useState<FiltrarSchema>(FILTRO_INICIAL)
    const { modais, toggleModal } = useModal({ filtrar: false })
    const { data: graficos, isLoading } = useObterGraficos(filtro)
    const graficosFormatados = graficos?.map(formatarItem) ?? []
    const alterarFiltro = (novoFiltro: FiltrarSchema) => setFiltro(novoFiltro)

    useEffect(() => {
        document.title = "Dashboard"
    }, [])

    return { filtro, alterarFiltro, graficosFormatados, modais, toggleModal, isLoading }
}
```

> `useModal` acima é **ilustrativo** — não existe nenhum hook `useModal` no projeto ainda. Modais implementados até agora (ex.: `ModalPedidoConcluido` em `FinalizarPedido`) controlam `open`/`onClose` com `useState` simples direto no `.hook.tsx` da página. Se/quando um padrão de modal se repetir em 2+ lugares, aí sim vale extrair um `useModal` de verdade.

### `.types.ts` — Tipos
Types, interfaces, props e enums locais. Inferência de schema quando necessário.

```ts
import type z from "zod"
import type { filtrarSchema } from "./Filtrar.schema"

export type FiltrarSchema = z.infer<typeof filtrarSchema>

export type FiltrarProps = {
    open: boolean
    onClose: () => void
    filtro: FiltrarSchema
    setFiltro: React.Dispatch<React.SetStateAction<FiltrarSchema>>
}
```

### `.utils.ts` — Utilitários
Constantes, records de mapeamento, formatadores, normalização de dados, validações customizadas.

```ts
export const FILTRO_INICIAL: FiltrarSchema = {
    from: addDays(new Date(), -30),
    to: new Date(),
}
```

### `.schema.ts` — Validação Zod
- Para campos `string` obrigatórios, preferir `.trim().nonempty("mensagem")` em vez de `.min(1, "mensagem")`.
- Usar `z.refine()` para validações complexas.
- Mensagens de erro em português.
- Regras de campo **reutilizadas em mais de um formulário** (ex.: e-mail, senha, CPF) ficam em `src/utils/validacoes.ts` (schemas de campo isolados, ex.: `emailSchema`, `cpfSchema`). O `.schema.ts` de cada formulário importa essas peças e monta o `z.object({...})` específico da tela (ex.: `Login.schema.ts` compõe `loginSchema` a partir de `emailSchema`/`senhaSchema` vindos de `validacoes.ts`). Regra específica de um único formulário fica só no `.schema.ts` local, não precisa subir para o arquivo global.
- Evitar `.transform()`/`.pipe()` em campos de schema — ver seção "Lições Técnicas" no fim deste arquivo.

### `.styles.ts` — Estilos
- Sempre `SxProps<Theme>` do MUI, nunca `styled-components` ou CSS-in-JS de outra lib.
- Em páginas, preferir `sx` diretamente nos componentes MUI (evitar `.styles.ts` para páginas simples).
- Em componentes compartilhados, usar arquivo `.styles.ts` separado.
- Variantes dinâmicas viram funções: `export const card = (ativo: boolean): SxProps<Theme> => ({...})`.
- Reaproveitar valores repetidos (fontFamily, breakpoints, cores de marca) — evitar copiar/colar blocos de estilo entre arquivos; extrair função ou constante compartilhada quando o mesmo bloco aparecer em mais de um lugar.

---

## Estrutura de Módulos (páginas com API)
```plaintext
src/pages/NomePagina
├── NomePagina.tsx
├── NomePagina.hook.tsx
├── NomePagina.styles.ts
└── components/             # Componentes extraídos específicos da página
src/components/
├── ComponenteGeral
src/api/
├── Controllers/
    ├── Pagina.ts
├── models/
    ├── Pagina.types.ts
```

Controllers e models ficam em pastas **compartilhadas** (`src/api/Controllers/`, plural, C maiúsculo; `src/api/models/`, plural, minúsculo) — um arquivo por página/domínio, nunca aninhados dentro de `src/pages/NomePagina/`.

## Models (`*.types.ts`)
Sempre usar **namespace** para agrupar Request/Response de uma mesma operação:

```ts
export enum EntidadeQueryKeys {
    ObterEntidade = "obterEntidade",
}

export type Entidade = {
    id: number
    nome: string
}

export namespace ObterEntidade {
    export type Response = Entidade
}
```

- Enum de QueryKeys no início do arquivo.
- Namespace agrupa Request e Response de uma mesma operação.
- Types de domínio ficam fora do namespace para reuso.
- `@typescript-eslint/no-namespace` deve estar desabilitado no projeto (ver seção Configuração).

## Controllers — Dados Mockados com Faker
Enquanto a API real não existe, os controllers devem usar `@tanstack/react-query` com `queryFn` retornando dados gerados por `@faker-js/faker` (com `faker.seed()` fixo para resultados estáveis), simulando delay de rede com `setTimeout`. Isso deixa o controller pronto para trocar `queryFn` pela chamada HTTP real sem alterar o restante da página.

```ts
export const useObterEntidade = () => {
    return useQuery({
        queryKey: [EntidadeQueryKeys.ObterEntidade],
        queryFn: async (): Promise<ObterEntidade.Response> => {
            await new Promise((resolve) => setTimeout(resolve, 400))
            faker.seed(42)
            return { id: 1, nome: faker.commerce.productName() }
        },
    })
}
```

### Regras de Controllers
- **Nunca** usar `mutationKey` em mutations.
- Usar `invalidarQueries`/`reexecutarQueries` (utilitários do projeto) para cache — ambos suportam `await`. **Ainda não implementados** — nenhum controller precisou invalidar cache até agora (todas as páginas têm no máximo uma query própria). Quando a primeira necessidade real aparecer, criar esses utilitários em `src/utils/` nesse momento, não antes.
- Queries devem ter `enabled` quando dependem de parâmetros.
- Usar enums para `queryKey`.

---

## Formulários
- **Sempre** usar React Hook Form. **Nunca** `useState` para valores de formulário.
- Campos **controlados** (via `Controller`) para formulários com múltiplos campos; `register` só para formulários de 1 campo (busca simples).
- Validação via Zod (`.schema.ts`) + `zodResolver`.
- Em filtros com intervalo de datas (`from`/`to`), aplicar **apenas** `minDate` no campo final (`to`); nunca `maxDate`.

### Comportamento Durante Envio (`isSubmitting`/`isPending`)
| Elemento | Prop | Valor |
|----------|------|-------|
| Campos do formulário | `disabled` | `isSubmitting` |
| Botão de ação (submit) | `loading`/texto condicional | `isSubmitting` |
| Demais botões | `disabled` | `isSubmitting` |

---

## React & Arquitetura

### Regras de Código
- **Não usar** `useCallback`, `useMemo` ou `memo` — o React Compiler otimiza automaticamente.
- **Não usar** `forwardRef` — usar o padrão ref-as-prop do React 19.
- **Não usar** comentários — código deve ser autoexplicativo.
- Corrigir erros do linter/TypeScript na raiz — nunca silenciar com ignores/disables.

### Prioridade de Componentes
1. **`@/components`** — sempre verificar primeiro (componentes internos, hooks, utils, ícones).
2. **MUI** — para componentes base (`Stack`, `Tooltip`, `Collapse`, `Box`, etc).
3. **Criar do zero** — último recurso, e só depois de confirmar que não existe nada reaproveitável.

Ao identificar uma variante nova de um componente já existente (ex.: botão, controle de quantidade), preferir estender o componente existente com uma nova prop/variante a criar um componente duplicado do zero.

### Ícones
Usar sempre `lucide-react`.

---

## Path Alias
- O alias `@/` resolve para `src`. Sempre preferir `@/` a caminhos relativos (`../../`).

```ts
// ✅ Correto
import { useObterDados } from "@/pages/Dashboard/controllers/dashboard"
// ❌ Incorreto
import { useObterDados } from "../../controllers/dashboard"
```

---

## Navegação & UX
- Redirects devem usar **View Transitions** via componente `Button` interno com prop `to` (não usar `Link` do React Router diretamente).
- Considerar sempre fluxo de UX, performance e acessibilidade.
- Usar HTML semântico, navegação por teclado e ARIA quando aplicável.

## Acessibilidade
- Usar tooltip do MUI em botões que só têm ícone, sem texto.
- Sempre incluir `aria-label` em botões de ícone e controles interativos sem texto visível.

## Estilos
- Nunca adicionar estilos ad-hoc que quebrem o design system.
- Evitar ruído visual e abstrações desnecessárias.
- **Páginas devem ter pouco ou nenhum estilo próprio** — o que requer estilização deve ser extraído em componente. Uma página idealmente só compõe componentes + hook de lógica/animação, sem `sx` de detalhe visual.

---

## Configuração do Projeto

### React Compiler (`vite.config.ts`)
O projeto roda em **Vite 8**, cujo `@vitejs/plugin-react` (v6) é baseado em Rolldown e **não** aceita mais a opção antiga `react({ babel: { plugins: [...] } })` para plugar o React Compiler — essa forma é ignorada silenciosamente (nenhum erro, mas o compiler nunca roda). A forma correta nesta versão:

```ts
import { defineConfig } from "vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"
import path from "node:path"

export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    resolve: {
        alias: { "@": path.resolve(import.meta.dirname, "src") },
    },
})
```

Dependências: `babel-plugin-react-compiler` (`1.0.0`, tag `latest` — não usar as tags `beta`/`rc`), `@rolldown/plugin-babel`, `@babel/core`, `@types/babel__core` (dev). O `eslint-plugin-react-hooks` instalado (`^7.x`) já inclui as regras de lint do React Compiler (`purity`, `immutability`, `set-state-in-render`, `globals`, etc.) dentro do preset `flat.recommended` já usado no `eslint.config.js` — não precisa de um `eslint-plugin-react-compiler` separado.

**Como verificar se está realmente ativo:** abrir qualquer página no browser e checar se o `.tsx` servido importa `react/compiler-runtime` e usa `const _c = ...["c"]` — se não tiver isso, o compiler não está rodando de verdade, mesmo que o pacote esteja instalado.

### TypeScript (`tsconfig.app.json`)
- `erasableSyntaxOnly` deve ser `false` (ou omitido) — o projeto usa `namespace` e `enum` propositalmente nos models.

### ESLint (flat config)
- `@typescript-eslint/no-namespace` desabilitado (globalmente ou escopado a `**/*.types.ts`), já que o padrão de Models depende de `namespace`.

---

## Lições Técnicas (armadilhas já encontradas neste projeto)

### React Compiler — a config antiga (`react({ babel: {...} })`) não funciona no Vite 8
O CLAUDE.md dizia "React 19 com React Compiler" há um tempo, mas o compiler nunca esteve de fato instalado/configurado — a regra "não usar `useCallback`/`useMemo`/`memo`" estava sem sustentação real. Ao instalar, a primeira tentativa (`react({ babel: { plugins: [["babel-plugin-react-compiler", {}]] } })`, a forma "clássica" documentada em quase todo tutorial) **não gerou nenhum erro, mas também não compilou nada** — silenciosamente ignorada, porque `@vitejs/plugin-react@6` (o major atual, usado neste projeto por rodar em Vite 8/Rolldown) removeu essa opção. A forma correta é registrar um plugin `babel()` separado do `@rolldown/plugin-babel` com o preset `reactCompilerPreset()` exportado pelo próprio `@vitejs/plugin-react` — ver seção "React Compiler (`vite.config.ts`)" acima. Se for atualizar o Vite/plugin-react no futuro, checar de novo se essa API mudou antes de assumir que "instalar o pacote" é suficiente — validar sempre inspecionando o código servido (procurar `react/compiler-runtime`), nunca só pela ausência de erro no console.

### Zod v4 — `.transform()` e `.pipe()` tornam o campo opcional no tipo inferido
Encadear `.transform(...)` ou `.pipe(outroSchema)` em um campo dentro de um `z.object({...})` faz o TypeScript inferir esse campo como **opcional** (`campo?: string`) em `z.infer<typeof schema>`, mesmo a validação em si continuando obrigatória em runtime. Isso já causou erros reais de tipo (`Property 'x' is optional... but required`) em dois formulários diferentes.
- **Evitar:** `.transform()` e `.pipe()` em campos de schemas de formulário.
- **Usar no lugar:** `.trim()`, `.toLowerCase()`, `.min()`, `.max()`, `.length()`, `.regex()`, `.refine()` — esses métodos não disparam o bug.
- Exemplo: para validar e-mail, usar `z.string().trim().toLowerCase().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "mensagem")` em vez de `.pipe(z.email())`.

### Máscaras de input — usar `react-imask`, não `react-input-mask`
`react-input-mask` (última versão publicada em 2022) chama `ReactDOM.findDOMNode` internamente, API **removida** no React 19 (`react-dom@19` não a exporta mais) — quebra em runtime assim que o campo recebe foco/digitação. Usar **`react-imask`** (`IMaskInput`), que é mantida e compatível.
- Padrão adotado: um componente adaptador local que recebe `mascara` (string, sintaxe de padrão do IMask: `0` = dígito, `a` = letra, `*` = qualquer) e repassa para `IMaskInput`, plugado no `TextField` do MUI via `slotProps={{ input: { inputComponent: Adaptador, inputProps: { mascara } } }}`.
- Ver `src/components/InputControlado/InputControlado.tsx` como referência.

### Adaptador de `inputComponent` do MUI — o ref chega pela prop `ref`, não `inputRef`
Ao passar um componente customizado via `TextField`'s `slotProps.input.inputComponent`, o MUI `InputBase` repassa o nó DOM do `<input>` através da prop **`ref`** (padrão ref-as-prop do React 19), não por uma prop chamada `inputRef`. Se o adaptador desestruturar `inputRef` em vez de `ref`, o ref nunca é conectado — o MUI loga `"...does not correctly handle the ref prop"` no console e o foco/seleção do campo pode não funcionar corretamente. Sempre desestruturar `ref` e repassá-lo ao `inputRef` do `IMaskInput` (ou ao `ref` do input nativo, conforme o caso).

### Rotas são strings soltas — conferir sempre contra `src/routes/router.tsx`
`to="/AlgumaRota"` (no `Button`) e `navigate("/AlgumaRota")` não têm checagem de tipos contra as rotas registradas — um erro de caixa (`/SelecaoModo` em vez de `/selecao-modo`) só aparece como 404 em runtime, nunca no `tsc`/lint. Isso já causou uma cadeia de telas inacessíveis (Home → SelecaoModo → SelecaoInstrumento → SelecaoAtividade → PraticaLivre) por divergência de caixa entre a string do link e o path registrado no router. Ao criar ou revisar navegação, sempre comparar a string literal contra `router.tsx` — todas as rotas do projeto são kebab-case minúsculo.

### Listas sem `key` — checar todo `.map()` que renderiza JSX
Encontrado `.map()` renderizando `<Button>` sem `key` (`PainelFiltrosAtividade`), causando warning do React e reconciliação instável. Todo `.map()` que retorna elemento precisa de `key` estável (geralmente o próprio valor iterado, quando for string/id único).

### Cards — padronizar com `variante`, não duplicar componente
Havia duplicação visual entre `CardBeneficio` (ícone + título + descrição) e um card "solto" dentro de `PilaresSaibaMais` (imagem + título + descrição) — mesmo DNA visual (fundo branco/gradiente, borda colorida, `boxShadow`, hover-lift), só o slot do topo mudava (ícone vs. imagem). Consolidado em `CardBeneficio` com `variante?: "beneficio" | "pilar"`. Mesma lógica já existia em `CardSelecao` (`variante: "modo" | "instrumento"`) — usar como referência.
- Ao padronizar, manter o efeito de hover **dentro do próprio componente** (via `sx`/`:hover`), não espalhado no chamador (ex.: `CardSelecao` tinha a variante `"modo"` com hover implementado via `framer-motion` no componente pai, enquanto `"instrumento"` tinha hover no próprio `.styled.ts` — inconsistente; unificado para os dois viverem no componente).
- `CardAtividade` foi mantido **fora** dessa padronização de propósito: seu visual é guiado por um enum de domínio (`StatusAtividade`), não por uma `variante` puramente apresentacional — forçar isso numa prop genérica vazaria lógica de negócio para um componente de UI.
- Cards clicáveis feitos com `Stack`/`Box` + `onClick` (em vez de `<button>`/`ButtonBase`) precisam de `role="button"`, `tabIndex={0}` e `onKeyDown` (Enter/Espaço) para funcionar via teclado — não vem de graça.