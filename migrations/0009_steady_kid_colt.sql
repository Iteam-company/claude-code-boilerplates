ALTER TABLE "posts" ADD COLUMN "published_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "posts_author_id_idx" ON "posts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "posts_published_idx" ON "posts" USING btree ("published");