import { integer, text, blob, sqliteTable } from "drizzle-orm/sqlite-core";
import { jobDataTable } from "./jobData";

export const generatedPdfTable = sqliteTable("generated_pdf", {
    id: integer().primaryKey({ autoIncrement: true}).notNull(),
    fileName: text().notNull(),
    documentDefinition: text("document_definition", { mode: "json" }).notNull(),
    createdDate: integer("created_date").$defaultFn(() => Date.now()),
    jobDataId: integer().references(() => jobDataTable.id)
});