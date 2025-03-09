CREATE TABLE "test_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"results" jsonb NOT NULL,
	"score" varchar(10) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
