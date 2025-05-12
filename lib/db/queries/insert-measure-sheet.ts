import { db } from "../index";
import { type InsertJobData, jobDataTable } from "~/lib/db/schema";

export async function createMeasureSheet(data: InsertJobData): Promise<void> {
    const id = data.id;
    if (id) {
        throw new Error("Trying to create new measure sheet with id.");
    }
    await db.insert(jobDataTable).values(data);
}

export async function updateMeasureSheet(data: InsertJobData): Promise<void> {
    const id = data.id;
    if (!id) {
        throw new Error("Trying to update measure sheet without valid id.");
    }
    await db.insert(jobDataTable).values(data);
}