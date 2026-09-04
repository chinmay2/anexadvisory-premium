# ANEX Property Platform — Database Foundation

Phase 1 establishes the database model for the new property-map and property-management platform.

## Scope

- Properties and publication status
- Google Maps location metadata
- Property images and Cloudflare R2 storage keys
- Amenities
- Construction progress and progress images
- Public property enquiries
- Admin/editor users

## Environment

Set `DATABASE_URL` to the PostgreSQL connection string before running Prisma commands.

## Important isolation rule

This database foundation is for the new property platform only. Existing ANEX pages and sections are not migrated or modified by Phase 1.
