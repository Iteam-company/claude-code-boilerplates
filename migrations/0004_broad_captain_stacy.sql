CREATE TYPE "public"."waitlist_plan" AS ENUM('free', 'pro');--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"plan" "waitlist_plan" NOT NULL,
	"github_username" text,
	"stripe_session_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "tags" text[] DEFAULT '{}' NOT NULL;