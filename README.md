
# Resejournal — Boilerplate

Detta är ett startrepo (monorepo) för resejournal‑tjänsten.

## Struktur

```
/ (monorepo)
  /apps
    /web         # React + Vite (PWA)
    /api         # Azure Functions (Node/TypeScript)
  /.github       # CI/CD
```

## Snabbstart

1. Installera Node (>=20) och Azure Functions Core Tools.
2. `cd apps/web && npm ci && npm run dev` för frontend.
3. `cd apps/api && npm ci && npm run start` för functions lokalt.
4. Konfigurera miljövariabler i `apps/api/.env.local`.
5. Sätt upp GitHub Actions‑hemligheter (`AZURE_SWA_TOKEN`) för deploy.

Se teknisk guide för detaljer om Azure‑resurser, B2C och Tesla‑auth.
