import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { jobDataTable } from "./jobData";
import { createInsertSchema } from "drizzle-zod";
import type { InferSelectModel } from "drizzle-orm";

export const customerInformationTable = sqliteTable("customer_information", {
    id: integer().primaryKey({autoIncrement: true}),
    name: text(),
    streetNumber: text("street_number"),
    streetName: text("street_name"),
    lotNumber: text("lot_number"),
    cityTown: text("city_town"),
    state: text(),
    zipCode: text("zip_code"),
    plantation: text(),
    mobile1: text(),
    mobile2: text(),
    home: text(),
    builderSuperName: text("builder_super_name"),
    builderSuperMobile: text("builder_super_mobile"),
    jobDataId: integer("job_data_id").references(() => jobDataTable.id, { onDelete: "cascade" }),
});

export type InsertCustomerInformation = {
    id?: number;
    name?: string;
    streetNumber?: string;
    streetName?: string;
    lotNumber?: string;
    cityTown?: string;
    state?: string;
    zipCode?: string;
    plantation?: string;
    mobile1?: string;
    mobile2?: string;
    home?: string;
    builderSuperName?: string;
    builderSuperMobile?: string;
    jobDataId?: string;
}

export type SelectCustomerInformation = InferSelectModel<typeof customerInformationTable>;