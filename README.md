# Kappa Novel Engine

  Visual novel engine based on Akutagawa Ryunosuke's "Kappa" (河童).

  ## Stack
  - **Frontend**: React + Vite + Tailwind CSS + Framer Motion
  - **Backend**: Express 5 + Node.js
  - **Database**: PostgreSQL + Drizzle ORM
  - **Monorepo**: pnpm workspaces

  ## Structure
  ```
  artifacts/
    api-server/     # Express API
    novel-engine/   # React frontend (visual novel UI)
  lib/
    db/             # Drizzle ORM schema
    api-spec/       # OpenAPI spec
  ```
  