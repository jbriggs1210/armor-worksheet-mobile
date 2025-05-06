import { db } from "~/lib/db";
import { customerInformationTable, measureSheetTable } from "~/lib/db/schema";
import { getTableColumns, eq } from "drizzle-orm";

export async function selectMeasureSheets (page = 1, size = 100): Promise<Array<any>> {

    return db.select()
        .from(measureSheetTable)
        .leftJoin(customerInformationTable, eq(measureSheetTable.id, customerInformationTable.measureSheetId))
        .groupBy(measureSheetTable.id)
        .limit(size)
        .offset((page - 1) * size);
}

export async function selectMeasureSheetById (id: number): Promise<any> {

    return db.select()
        .from(measureSheetTable)
        .where(eq(measureSheetTable.id, id))
        .leftJoin(customerInformationTable, eq(measureSheetTable.id, customerInformationTable.measureSheetId))
}