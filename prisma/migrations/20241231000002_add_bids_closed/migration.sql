-- Add bidsClosed field to Post table
ALTER TABLE "Post" ADD COLUMN "bidsClosed" BOOLEAN NOT NULL DEFAULT FALSE;