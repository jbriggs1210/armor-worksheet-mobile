CREATE TABLE `generated_pdf` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`file_name` text NOT NULL,
	`data` blob NOT NULL,
	`created_date` integer,
	`job_data_id` integer,
	FOREIGN KEY (`job_data_id`) REFERENCES `job_data`(`id`) ON UPDATE no action ON DELETE no action
);
