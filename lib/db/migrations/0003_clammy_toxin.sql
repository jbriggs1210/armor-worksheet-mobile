ALTER TABLE `generated_pdf` RENAME COLUMN "data" TO "document_definition";--> statement-breakpoint
DROP INDEX "job_data_job_number_unique";--> statement-breakpoint
ALTER TABLE `generated_pdf` ALTER COLUMN "document_definition" TO "document_definition" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `job_data_job_number_unique` ON `job_data` (`job_number`);