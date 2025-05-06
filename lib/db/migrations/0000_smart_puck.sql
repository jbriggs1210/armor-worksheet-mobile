CREATE TABLE `measure_sheet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`job_number` text NOT NULL,
	`name` text,
	`sales_rep` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `measure_sheet_job_number_unique` ON `measure_sheet` (`job_number`);--> statement-breakpoint
CREATE TABLE `customer_information` (
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
	FOREIGN KEY (`measure_sheet_id`) REFERENCES `measure_sheet`(`id`) ON UPDATE no action ON DELETE cascade
);
