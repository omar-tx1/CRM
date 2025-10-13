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
