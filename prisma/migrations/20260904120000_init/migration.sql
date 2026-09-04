CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'MIXED_USE', 'PLOT', 'REDEVELOPMENT', 'OTHER');
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "ImageType" AS ENUM ('COVER', 'GALLERY', 'CONSTRUCTION', 'FLOOR_PLAN', 'DOCUMENT');
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED');
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR');

CREATE TABLE "properties" (
  "id" TEXT NOT NULL,
  "project_name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "property_type" "PropertyType" NOT NULL,
  "status" "PropertyStatus" NOT NULL DEFAULT 'DRAFT',
  "short_description" TEXT,
  "description" TEXT,
  "address" TEXT,
  "locality" TEXT,
  "city" TEXT,
  "state" TEXT,
  "country" TEXT DEFAULT 'India',
  "pincode" TEXT,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "place_id" TEXT,
  "price_from" DECIMAL(18,2),
  "price_to" DECIMAL(18,2),
  "currency" TEXT NOT NULL DEFAULT 'INR',
  "rera_number" TEXT,
  "possession_date" TIMESTAMP(3),
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "published_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "property_images" (
  "id" TEXT NOT NULL,
  "property_id" TEXT NOT NULL,
  "type" "ImageType" NOT NULL DEFAULT 'GALLERY',
  "storage_key" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "alt_text" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "amenities" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "property_amenities" (
  "property_id" TEXT NOT NULL,
  "amenity_id" TEXT NOT NULL,
  CONSTRAINT "property_amenities_pkey" PRIMARY KEY ("property_id", "amenity_id")
);

CREATE TABLE "construction_progress" (
  "id" TEXT NOT NULL,
  "property_id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "progress_pct" INTEGER,
  "status" TEXT,
  "date" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "construction_progress_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "progress_images" (
  "id" TEXT NOT NULL,
  "progress_id" TEXT NOT NULL,
  "storage_key" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "alt_text" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "progress_images_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "enquiries" (
  "id" TEXT NOT NULL,
  "property_id" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "message" TEXT,
  "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
  "password_hash" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");
CREATE UNIQUE INDEX "amenities_name_key" ON "amenities"("name");
CREATE UNIQUE INDEX "amenities_slug_key" ON "amenities"("slug");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

CREATE INDEX "properties_status_idx" ON "properties"("status");
CREATE INDEX "properties_property_type_idx" ON "properties"("property_type");
CREATE INDEX "properties_city_locality_idx" ON "properties"("city", "locality");
CREATE INDEX "properties_latitude_longitude_idx" ON "properties"("latitude", "longitude");
CREATE INDEX "properties_featured_status_idx" ON "properties"("featured", "status");
CREATE INDEX "property_images_property_id_type_sort_order_idx" ON "property_images"("property_id", "type", "sort_order");
CREATE INDEX "construction_progress_property_id_date_idx" ON "construction_progress"("property_id", "date");
CREATE INDEX "progress_images_progress_id_sort_order_idx" ON "progress_images"("progress_id", "sort_order");
CREATE INDEX "enquiries_property_id_status_idx" ON "enquiries"("property_id", "status");
CREATE INDEX "enquiries_created_at_idx" ON "enquiries"("created_at");

ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "construction_progress" ADD CONSTRAINT "construction_progress_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "progress_images" ADD CONSTRAINT "progress_images_progress_id_fkey" FOREIGN KEY ("progress_id") REFERENCES "construction_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
