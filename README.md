# Heritage 105 — Quote Generator
Quote management app for the restaurant L'Héritage 105, allowing creation, viewing, and PDF export of quotes, with a product catalog managed via Strapi CMS.

## Tech Stack
Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4
Backend/CMS: Strapi 5 (SQLite default)
Validation: Zod + React Hook Form
PDF generation: jsPDF + html2canvas
Runtime: Node 20+, Yarn (Corepack)
Dev containers: Docker Compose

## Project Structure
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
│   │   ├── reducers/         # QuoteFormReducer
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── services/         # Strapi API calls
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # generatePDF
│   └── Dockerfile.dev
├── docker-compose.yml
└── README.md

### Strapi Data Model
Collections
Collection	Main Fields
Category	name, slug, relation products (oneToMany)
Product	name, unitPrice, vat, relation category (manyToOne)
Quote	Client info, clientType (enum), items (repeatable component)
Component QuoteItem

Stores a snapshot of products at quote creation: productName, unitPrice, vat, quantity.
Prevents later price changes from affecting existing quotes.

## Quick Start (Docker)
### From project root
docker compose up --build
Frontend: http://localhost:3000
Strapi Admin: http://localhost:1337/admin
 (create admin on first visit)
 
### Start Without Docker

Two terminals required.

Strapi (content/)

cd content
corepack enable
yarn install
yarn develop

Next.js (web/)

cd web
corepack enable
yarn install
yarn dev

## Environment Variables

web/.env.local

NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=<your_token>

Token: Strapi → Settings → API Tokens → Full access.

content/ (preconfigured for dev in docker-compose.yml)

APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, TRANSFER_TOKEN_SALT
DATABASE_CLIENT=sqlite

## Features
3-step quote creation: client info → product selection → preview
Form validation: Zod + React Hook Form, conditional fields for client type
Product catalog: loaded from Strapi with accordion by category, live search
Save + PDF export: quote saved in Strapi, downloadable as PDF
Quote list: server-side pagination, search, detail modal, PDF download
Product snapshot: prices frozen at quote creation

## Notable Points
HomePage is a Server Component fetching quotes; interactive list is in QuoteListClient
QuoteTemplate accepts a Strapi Quote or local QuoteFormState (preview)
adress field in Strapi contains a typo — fix in migration

## Useful Scripts
### Docker
docker compose up           # Start
docker compose up --build   # Rebuild + start
docker compose down         # Stop
docker compose down -v      # Stop + remove volumes

### Next.js
yarn dev      # Development
yarn build    # Production build
yarn lint     # Lint

### Strapi
yarn develop  # Development
yarn build    # Production build
🏭 Production
