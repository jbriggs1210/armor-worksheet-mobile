import { db } from "../index";
import { type InsertMeasureSheet, measureSheetTable } from "~/lib/db/schema";

export async function createMeasureSheet(data: InsertMeasureSheet): Promise<void> {
    await db.insert(measureSheetTable).values(data);
}