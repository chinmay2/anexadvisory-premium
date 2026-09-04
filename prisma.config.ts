import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma Client generation does not require a live database connection.
    // Database operations use DATABASE_URL when it is supplied by CI/deployment.
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/anexadvisory",
  },
});
