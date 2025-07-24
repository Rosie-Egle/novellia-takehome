DO $$ BEGIN
 CREATE TYPE "animal_type" AS ENUM('DOG', 'CAT', 'BIRD', 'HAMSTER', 'HORSE', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"animal_type" "animal_type" NOT NULL,
	"owner_name" text NOT NULL,
	"dob" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
