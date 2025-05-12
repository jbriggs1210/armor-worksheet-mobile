import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { jobDataTable } from "./jobData";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const customerInformationTable = sqliteTable('customer_information', {
    id: integer().primaryKey({ autoIncrement: true }),
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

export type InsertCustomerInformationType = InferInsertModel<typeof customerInformationTable>;
export type SelectCustomerInformationType = InferSelectModel<typeof customerInformationTable>;

export const insertCustomerInformation = createInsertSchema(customerInformationTable, {
    id: z.custom(data => data === null || data === undefined),
    jobDataId: z.custom(data => data !== null && data !== undefined),
});
export const updateCustomerInformation = createUpdateSchema(customerInformationTable, {
    id: z.custom(data => data !== null && data !== undefined),
    jobDataId: z.custom(data => data !== null && data !== undefined),
});
export const selectCustomerInformation = createSelectSchema(customerInformationTable);