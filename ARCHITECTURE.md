# Arquitetura

## Estrutura

Monorepo com npm workspaces:

```
/apps/web   → frontend
/apps/api   → backend
```

Mantém front e back no mesmo repositório, facilitando a avaliação e permitindo compartilhar código (como os schemas de validação).

## Frontend

| Lib | Por quê |
|---|---|
| **React + TypeScript** | Requisito da vaga. Tipagem ajuda a evitar erros e documenta os dados. |
| **Vite** | Build rápido e praticamente sem configuração. |
| **React Router** | Navegação entre listagem, criação e edição de projetos. |
| **TanStack Query** | Cuida de cache, loading, erro e atualização dos dados da API, evitando `useEffect` manual em cada tela. |
| **react-hook-form** | Formulários performáticos e com pouco código. |
| **yup** | Validação dos formulários, integrada ao react-hook-form via `@hookform/resolvers`. |
| **Tailwind CSS** | Estilização rápida e consistente, facilitando a fidelidade ao design. |

## Backend

| Lib | Por quê |
|---|---|
| **Node.js + TypeScript** | Mesma linguagem do front e requisito da vaga. |
| **Express** | Simples, conhecido e suficiente para uma API REST pequena. |
| **yup** | Validação do corpo das requisições, reaproveitando os mesmos schemas do front. |
| **Prisma** | ORM tipado, com migrations e schema fácil de ler. |
| **PostgreSQL** | Banco relacional robusto e com hospedagem gratuita disponível. |

## Deploy

| Serviço | Uso |
|---|---|
| **Vercel** | Hospedagem do frontend. |
| **Render** | Hospedagem da API (no plano gratuito, a primeira requisição pode demorar alguns segundos). |
| **Neon** | PostgreSQL gerenciado e gratuito, com dados persistentes. |

Localmente, basta apontar a variável `DATABASE_URL` para qualquer PostgreSQL (por exemplo, um banco de desenvolvimento no próprio Neon).

## Fora do escopo

Login e autenticação não foram implementados, pois não fazem parte dos requisitos.
