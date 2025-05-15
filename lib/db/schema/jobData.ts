import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from "drizzle-orm";

export const jobDataTable = sqliteTable( "job_data", {
    id: integer().primaryKey({ autoIncrement: true}).notNull(),
    jobNumber: text("job_number").notNull().unique(),
    date: integer(),
    salesRep: text("sales_rep"),
});

export type InsertJobData = {
    id?: number;
    jobNumber: string;
    date?: number;
    salesRep: string;
};

export type SelectJobData = InferSelectModel<typeof jobDataTable>;