CREATE TABLE `job_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`job_number` text NOT NULL,
	`date` integer,
	`sales_rep` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `job_data_job_number_unique` ON `job_data` (`job_number`);--> statement-breakpoint
CREATE TABLE `customer_information` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
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
	`job_data_id` integer,
	FOREIGN KEY (`job_data_id`) REFERENCES `job_data`(`id`) ON UPDATE no action ON DELETE cascade
);
