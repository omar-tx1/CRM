# Texas Junk Boyz CRM

Texas Junk Boyz (TJB) CRM is a monorepo that delivers a production-ready field-service and accounting platform purpose built for junk removal operations.

## Project Structure

```
.
├── apps
│   ├── api        # Express + Prisma backend
│   └── web        # Next.js 14 frontend
├── packages
│   ├── config     # Shared tooling configs
│   ├── types      # Shared types & Zod schemas
│   └── ui         # Shared UI components
├── docs           # OpenAPI and design docs
└── .github        # CI/CD workflows
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL database (e.g. Neon, Supabase, or Replit Postgres)

### Environment

Copy `.env.example` to `.env` in the repo root and update the values.

```
cp .env.example .env
```

### Install Dependencies

```
npm install
```

### Database Setup

```
npm run generate --workspace apps/api
npm run migrate --workspace apps/api -- --name init
npm run seed --workspace apps/api
```

### Development Servers

Run the API and web apps together:

```
npm run dev
```

- API available at `http://localhost:4000`
- Web app available at `http://localhost:3000`

### GitHub Codespaces

The repository includes a `.devcontainer` configuration so you can launch it directly in GitHub Codespaces:

1. Click **Code → Create Codespace on main** in GitHub.
2. Codespaces automatically provisions Node.js 18 and PostgreSQL 16, installs dependencies, and generates the Prisma client (see `.devcontainer/devcontainer.json`).
3. Copy `.env.example` to `.env` and adjust secrets. The default `DATABASE_URL` points at the in-container Postgres service.
4. Run database migrations and seed data:

   ```
   npm run migrate --workspace apps/api -- --name init
   npm run seed --workspace apps/api
   ```

5. Start the dev servers with `npm run dev`. Forwarded ports 3000 (web) and 4000 (API) are preconfigured and appear in the Codespaces port panel.

### Testing

```
npm test
```

## Docs

- [OpenAPI Spec](docs/openapi.yaml)

## Feature Flags

- `FEATURE_BUILTIN_ACCOUNTING=true` enables the accounting module.

## License

Proprietary – Texas Junk Boyz internal tooling.
