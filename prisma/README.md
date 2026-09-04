# ANEX Property Platform — Database Foundation

Phase 1 established the database model for the new property-map and property-management platform. Phase 2 connects that model to a managed PostgreSQL deployment using Prisma 7 and the Neon PostgreSQL driver adapter.

## Phase 2 completed scope

- Prisma 7 client generation with an isolated generated-client output directory
- PostgreSQL datasource configuration through `prisma.config.ts`
- Neon-compatible Prisma PostgreSQL adapter via `@prisma/adapter-pg`
- Reusable server-side Prisma client in `lib/prisma.ts`
- Environment-only `DATABASE_URL` configuration; credentials are never stored in source control
- Initial migration under `prisma/migrations/`
- GitHub Actions validation, Prisma generation, lockfile synchronization, Neon connectivity check, and migration deployment
- Property-platform database health endpoint at `/api/property-platform/health`

## Environment

Set `DATABASE_URL` in the deployment/CI secret store. Never place the real connection string in Git, source files, or committed `.env` files.

## Automated deployment

The `Property Platform Database` GitHub Actions workflow runs for property-platform database changes. It installs dependencies, synchronizes the npm lockfile when required, validates the Prisma schema, generates Prisma Client, checks the configured Neon connection, and deploys committed migrations.

## Important isolation rule

This database foundation is for the new property platform only. Existing ANEX pages, sections, navigation, styling, and existing project data are not migrated or modified by Phase 2.

## Phase boundary

Phase 2 is infrastructure/database only. Public property-map UI, admin CMS screens, Google Maps UI integration, Cloudflare R2 upload flows, and property CRUD APIs belong to the following implementation phases and must remain isolated from the existing ANEX website until explicitly approved.
