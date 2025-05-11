import { db } from "../index";
import { type InsertMeasureSheet, measureSheetTable } from "~/lib/db/schema";

export async function createMeasureSheet(data: InsertMeasureSheet): Promise<void> {
    const id = data.id;
    if (id) {
        throw new Error("Trying to create new measure sheet with id.");
    }
    await db.insert(measureSheetTable).values(data);
}

export async function updateMeasureSheet(data: InsertMeasureSheet): Promise<void> {
    const id = data.id;
    if (!id) {
        throw new Error("Trying to update measure sheet without valid id.");
    }
    await db.insert(measureSheetTable).values(data);
}