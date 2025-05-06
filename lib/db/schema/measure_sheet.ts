import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const measureSheetTable = sqliteTable('measure_sheet', {
    id: integer().primaryKey({ autoIncrement: true}),
    jobNumber: text("job_number").notNull().unique(),
    name: text(),
    salesRep: text("sales_rep"),
});

export type InsertMeasureSheet = typeof measureSheetTable.$inferInsert;
export type SelectMeasureSheet = typeof measureSheetTable.$inferSelect;