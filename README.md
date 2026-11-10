# Gerenciador de Projetos

Aplicação para gerenciar projetos: criar, editar, remover, favoritar, filtrar, ordenar e buscar.

## Funcionalidades

- Criar, editar e remover projetos, com imagem de capa opcional
- Favoritar projetos e filtrar apenas os favoritos
- Ordenar por ordem alfabética, iniciados mais recentemente ou prazo mais próximo
- Buscar por nome, com histórico das últimas buscas e destaque do termo nos resultados

## Rodando localmente

### Requisitos

- Node.js 24+
- PostgreSQL é opcional: o projeto consegue subir um banco local pra você (opção A abaixo)

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar o ambiente

Copie o arquivo de exemplo da API:

```bash
cp apps/api/.env.example apps/api/.env
```

Ele precisa do `DATABASE_URL`, configurado no próximo passo.

### 3. Configurar o banco

Escolha uma das opções abaixo.

#### Opção A: sem PostgreSQL instalado

Suba um PostgreSQL local gerenciado pelo Prisma (roda dentro do Node, sem instalar nada):

```bash
npm run db:start -w api
```

O comando imprime uma URL de conexão, como:

```
postgres://postgres:postgres@localhost:51214/template1?sslmode=disable
```

Cole essa URL no `DATABASE_URL` do `apps/api/.env`. Os dados são mantidos entre execuções. Para parar o banco:

```bash
npm run db:stop -w api
```

Esse banco aceita apenas uma conexão por vez, então mantenha só uma instância da API conectada a ele.

#### Opção B: com PostgreSQL

Crie um banco vazio:

```bash
psql -U postgres -c "CREATE DATABASE project_manager"
```

Depois configure o `DATABASE_URL` no `apps/api/.env`:

```
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/BANCO"
```

O valor padrão funciona para um PostgreSQL local com usuário `postgres`, senha `postgres` na porta `5432`.

### 4. Criar as tabelas

```bash
npm run db:deploy -w api
```

Isso roda as migrations do Prisma e cria a tabela `projects`.

### 5. Iniciar as aplicações

```bash
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:3333

`Ctrl+C` encerra as duas. Para rodar separadamente, use `npm run dev:web` e `npm run dev:api`.

## API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/projects` | Lista os projetos |
| `POST` | `/projects` | Cria um projeto |
| `PUT` | `/projects/:id` | Atualiza um projeto |
| `PATCH` | `/projects/:id/favorite` | Marca ou desmarca como favorito |
| `DELETE` | `/projects/:id` | Remove um projeto |

## Decisões técnicas

### Estrutura

Monorepo com npm workspaces:

```
apps/web   → frontend
apps/api   → backend
```

Como é um projeto simples, manter front e back no mesmo repositório deixa tudo mais fácil de gerenciar: um único histórico, em que cada funcionalidade aparece inteira, dos dois lados, e mais facilidade para compartilhar código entre eles, como tipos e validações.

### Frontend

| Lib | Por quê |
|---|---|
| **React + TypeScript** | |
| **Vite** | Build rápido e praticamente sem configuração. |
| **React Router** | Navegação entre listagem, busca, criação e edição. O data router permite usar View Transitions na animação entre telas. |
| **TanStack Query** | Cuida de cache, loading, erro e atualização dos dados da API, sem `useEffect` manual em cada tela. |
| **react-hook-form** | Formulários com pouco código e poucas re-renderizações. |
| **yup** | Validação dos formulários, integrada ao react-hook-form via `@hookform/resolvers`. |
| **Tailwind CSS** | Estilização rápida e consistente, com as cores e fontes do design definidas como tokens. |
| **react-day-picker** | Calendário do seletor de datas, estilizado com Tailwind. |
| **sonner** | Toasts de sucesso e erro. |

### Backend

| Lib | Por quê |
|---|---|
| **Node.js + TypeScript** |  |
| **Express** | Simples e suficiente para uma API REST pequena. |
| **yup** | Validação do corpo das requisições, com as mesmas regras do formulário. |
| **Prisma** | ORM tipado, com migrations versionadas e schema fácil de ler. |
| **PostgreSQL** | Banco relacional robusto, com opções de hospedagem gratuita. |

## Deploy

| Serviço | Uso |
|---|---|
| **Vercel** | Hospedagem do frontend. |
| **Render** | Hospedagem da API (no plano gratuito, a primeira requisição pode demorar alguns segundos). |
| **Neon** | PostgreSQL gerenciado e gratuito, com dados persistentes. |