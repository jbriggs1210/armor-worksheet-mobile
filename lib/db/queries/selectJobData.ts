import { db } from "~/lib/db";
import { jobDataTable, type SelectJobDataType } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

export async function selectJobData (page = 1, size = 100): Promise<Array<SelectJobDataType>> {
    return db.select()
        .from(jobDataTable);
}

export async function selectJobDataById (id: number): Promise<Array<SelectJobDataType>> {
    return db.select()
        .from(jobDataTable)
        .where(eq(jobDataTable.id, id));
}