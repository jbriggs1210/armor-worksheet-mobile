ALTER TABLE `measure_sheet` RENAME TO `measureSheet`;--> statement-breakpoint
ALTER TABLE `measureSheet` RENAME COLUMN "job_number" TO "jobNumber";--> statement-breakpoint
ALTER TABLE `measureSheet` RENAME COLUMN "sales_rep" TO "salesRep";--> statement-breakpoint
DROP INDEX `measure_sheet_job_number_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `measureSheet_jobNumber_unique` ON `measureSheet` (`jobNumber`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_customer_information` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`street_number` text,
	`street_name` text,
	`lot_number` text,
	`city_town` text,
	`state` text,
	`zip_code` text,
	`plantation` text,
	`mobile1` text,
	`mobile2` text,
	`home` text,
	`builder_super_name` text,
	`builder_super_mobile` text,
	`measure_sheet_id` integer,
	FOREIGN KEY (`measure_sheet_id`) REFERENCES `measureSheet`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_customer_information`("id", "street_number", "street_name", "lot_number", "city_town", "state", "zip_code", "plantation", "mobile1", "mobile2", "home", "builder_super_name", "builder_super_mobile", "measure_sheet_id") SELECT "id", "street_number", "street_name", "lot_number", "city_town", "state", "zip_code", "plantation", "mobile1", "mobile2", "home", "builder_super_name", "builder_super_mobile", "measure_sheet_id" FROM `customer_information`;--> statement-breakpoint
DROP TABLE `customer_information`;--> statement-breakpoint
ALTER TABLE `__new_customer_information` RENAME TO `customer_information`;--> statement-breakpoint
PRAGMA foreign_keys=ON;