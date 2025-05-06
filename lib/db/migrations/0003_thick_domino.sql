ALTER TABLE `customer_information` RENAME TO `customerInformation`;--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "street_number" TO "streetNumber";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "street_name" TO "streetName";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "lot_number" TO "lotNumber";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "city_town" TO "cityTown";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "zip_code" TO "zipCode";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "builder_super_name" TO "builderSuperName";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "builder_super_mobile" TO "builderSuperMobile";--> statement-breakpoint
ALTER TABLE `customerInformation` RENAME COLUMN "measure_sheet_id" TO "measureSheetId";--> statement-breakpoint
ALTER TABLE `customerInformation` ALTER COLUMN "measureSheetId" TO "measureSheetId" integer REFERENCES measureSheet(id) ON DELETE cascade ON UPDATE no action;