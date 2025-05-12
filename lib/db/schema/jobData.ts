import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { customerInformationTable } from "~/lib/db/schema/customerInformation";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const jobDataTable = sqliteTable( "job_data", {
    id: integer().primaryKey({ autoIncrement: true}),
    jobNumber: text("job_number").notNull().unique(),
    date: integer({ mode: "timestamp" }),
    salesRep: text("sales_rep"),
});

export type InsertJobDataType = InferInsertModel<typeof jobDataTable>;
export type SelectJobDataType = InferSelectModel<typeof jobDataTable>;
export type SelectJobDataWithCustomerInfoType = InferSelectModel<typeof jobDataTable & typeof customerInformationTable>;

export const InsertJobData = createInsertSchema(jobDataTable, {
    id: z.custom(data => data === null || data === undefined),
});
export const UpdateJobData = createUpdateSchema(jobDataTable, {
    id: z.custom(data => data !== null && data !== undefined),
});
export const SelectJobData = createSelectSchema(jobDataTable);