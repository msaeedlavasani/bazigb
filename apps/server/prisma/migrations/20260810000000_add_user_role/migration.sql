-- Batch 14 (RBAC): add the user role column for the admin panel.
-- Values are 'USER' (default) and 'ADMIN'. Stored as TEXT because the
-- SQLite dev database cannot use Prisma enums; the app layer (AdminGuard)
-- enforces the allowed values.

ALTER TABLE "users" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'USER';
