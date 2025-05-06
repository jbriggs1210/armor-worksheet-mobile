import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const measureSheetTable = sqliteTable( "measureSheet", {
    id: integer().primaryKey({ autoIncrement: true}),
    jobNumber: text().notNull().unique(),
    date: integer(),
    salesRep: text(),
});

export type InsertMeasureSheet = typeof measureSheetTable.$inferInsert;
export type SelectMeasureSheet = typeof measureSheetTable.$inferSelect;