# Heritage 105 — Quote Generator

A quote management application for the **L'Héritage 105** restaurant. Create, browse, and export quotes as PDF, with a product catalog managed through a Strapi CMS.

## Tech Stack

- **Frontend** : Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend/CMS** : Strapi 5 (SQLite by default)
- **Validation** : Zod + React Hook Form
- **PDF** : jsPDF + html2canvas
- **Runtime** : Node 20+, Yarn (Corepack)
- **Dev containers** : Docker Compose

## Project Structure

```
boilerplate-nextjs-strapi/
├── content/          # Strapi v5 (API & Admin)
│   ├── config/       # Strapi config (db, server, plugins…)
│   ├── src/          # Content-types, controllers, routes…
│   └── Dockerfile.dev
├── web/              # Next.js
│   ├── src/
│   │   ├── app/              # Pages (App Router)
│   │   ├── components/       # UI & business components
│   │   ├── context/          # QuoteFormContext (useReducer)
│   │   ├── reducers/         # DevisFormReducer
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── services/         # Strapi API calls
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # generatePDF
│   └── Dockerfile.dev
├── docker-compose.yml
└── README.md
```

## Data Model

### Collections

| Collection | Key fields |
|------------|------------|
| `Category` | `name`, `slug`, `products` relation (oneToMany) |
| `Product`  | `name`, `unitPrice`, `vat`, `category` relation (manyToOne) |
| `Quote`    | Client info, `clientType` (enum), `items` (repeatable component) |

### `QuoteItem` Component

Stores a **snapshot** of products at the time the quote is created: `productName`, `unitPrice`, `vat`, `quantity`. This pattern prevents price changes from corrupting existing quotes.

## Quick Start (Docker)

```bash
# From the project root
docker compose up --build
```

- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin _(create an admin user on first visit)_

## Quick Start (without Docker)

Two terminals required.

**Strapi (`content/`)**
```bash
cd content
corepack enable
yarn install
yarn develop
```

**Next.js (`web/`)**
```bash
cd web
corepack enable
yarn install
yarn dev
```

## Environment Variables

**`web/.env.local`**
```bash
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=<your_token>
```

> Generate the token in Strapi → Settings → API Tokens → Full access.

**`content/`** _(pre-configured in `docker-compose.yml` for local dev)_
```
APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, TRANSFER_TOKEN_SALT
DATABASE_CLIENT=sqlite
```

## Features

- **3-step quote creation**: client info → product selection → preview
- **Form validation**: Zod + React Hook Form, conditional fields based on client type (individual / company)
- **Product catalog**: fetched from Strapi with category accordion and real-time search
- **Save + PDF export**: quote is saved to Strapi then exported as PDF on click
- **Quote list**: server-side pagination, search, detail modal, PDF download
- **Product snapshot**: prices are locked at the time of quote creation

## Notable Implementation Details

- `HomePage` is a **Server Component** that fetches quotes directly; the interactive list is extracted into `QuoteListClient`
- `QuoteTemplate` accepts two sources: a Strapi `Quote` or a local `QuoteFormState` (for preview)
- The `adress` field in Strapi has a typo (single `d`) — to be fixed in a follow-up migration

## Useful Commands

```bash
# Docker
docker compose up           # Start
docker compose up --build   # Rebuild and start
docker compose down         # Stop
docker compose down -v      # Stop and remove volumes

# Next.js
yarn dev      # Development server
yarn build    # Production build
yarn lint     # Lint

# Strapi
yarn develop  # Development server
yarn build    # Production build
```
