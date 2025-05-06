import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { measureSheetTable } from "./measure_sheet";

export const customerInformationTable = sqliteTable('customer_information', {
    id: integer().primaryKey({autoIncrement: true}),
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
    measureSheetId: integer("measure_sheet_id").references(() => measureSheetTable.id, { onDelete: "cascade" }),
});

export type InsertCustomerInformation = typeof customerInformationTable.$inferInsert;
export type SelectCustomerInformation = typeof customerInformationTable.$inferSelect;