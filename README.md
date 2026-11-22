# Make My Marriage

A responsive wedding planning workspace for couples and their families. The
project is being built as a portfolio-quality MVP, with planning for Indian
weddings at its center.

## Current phase

Phase 1 establishes the Next.js App Router, development tooling, and a simple
marketing homepage. Authentication, the database, APIs, and wedding workspace
features are not implemented yet. The sign-in links are placeholders and do not
authenticate or protect content.

## Requirements

- Node.js 24 LTS
- pnpm 12

## Local development

```powershell
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

No MongoDB Atlas or authentication credentials are needed to run this phase.
Copy `.env.example` to `.env.local` only when local environment settings are
needed. Never commit `.env.local` or other secret-bearing environment files.

## Validation

```powershell
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
```

## Project structure

```text
src/app/       App Router pages, root layout, and global styles
docs/          Product, architecture, API, and design documents
```

Add feature modules, shared components, database access, and authenticated
routes when those phases begin. Keep server credentials and database access out
of client components.

## Product and architecture documents

- [Product requirements](docs/product/prd.md)
- [System design](docs/architecture/system-design.md)
- [Database design](docs/architecture/database-design.md)
- [API design](docs/architecture/api-design.md)
- [Design guidelines](docs/design/design-guidelines.md)
