import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { measureSheetTable } from "./measureSheet";

export const customerInformationTable = sqliteTable('customerInformation', {
    id: integer().primaryKey({autoIncrement: true}),
    streetNumber: text(),
    streetName: text(),
    lotNumber: text(),
    cityTown: text(),
    state: text(),
    zipCode: text(),
    plantation: text(),
    mobile1: text(),
    mobile2: text(),
    home: text(),
    builderSuperName: text(),
    builderSuperMobile: text(),
    measureSheetId: integer().references(() => measureSheetTable.id, { onDelete: "cascade" }),
});

export type InsertCustomerInformation = typeof customerInformationTable.$inferInsert;
export type SelectCustomerInformation = typeof customerInformationTable.$inferSelect;