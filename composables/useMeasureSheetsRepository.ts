import {
    customerInformationTable,
    jobDataTable,
    type SelectCustomerInformation,
    type SelectJobData,
} from "~/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db-adapter";
import type { InsertMeasureSheet, SelectMeasureSheet } from "~/types/measure-sheet";

export default function () {

    return useState("useMeasureSheetsRepository", () => {
        return {
            reads: {
                findAll: findAllMeasureSheets,
                findById: findMeasureSheetById,
            },
            creates: {
                single: createMeasureSheet,
            },
            updates: {
                single: updateMeasureSheet,
            },
            deletes: {
                single: deleteMeasureSheetById,
            }
        };
    });
}

const findAllMeasureSheets = async (): Promise<InsertMeasureSheet[] | SelectMeasureSheet[] | {
    jobData: SelectJobData,
    customerInformation: SelectCustomerInformation | null
}[]> => {
    return await db.select({
        jobData: jobDataTable,
        customerInformation: customerInformationTable,
    })
        .from(jobDataTable)
        .leftJoin(customerInformationTable, eq(jobDataTable.id, customerInformationTable.jobDataId))
        .groupBy(jobDataTable.id);
};

const findMeasureSheetById = async (id: number | string) => {
    const lookupId = typeof id === "number" ? id : Number(id);
    const measureSheets = db.select({
        jobData: jobDataTable,
        customerInformation: customerInformationTable,
    })
        .from(jobDataTable)
        .where(eq(jobDataTable.id, lookupId))
        .leftJoin(customerInformationTable, eq(jobDataTable.id, customerInformationTable.jobDataId))
        .groupBy(jobDataTable.id);

    return measureSheets.then(result => result[0]);
};

const createMeasureSheet = async (measureSheet: InsertMeasureSheet | SelectMeasureSheet): Promise<void> => {
    const newJobData = measureSheet.jobData as typeof jobDataTable.$inferInsert;
    if (newJobData.id) {
        return Promise.reject("Trying to create measure sheet with an existing id.");
    }
    try {
        const insertedJobDataId: { insertedId: number }[] = await db.insert(jobDataTable).values(newJobData)
            .returning({insertedId: jobDataTable.id})
            .onConflictDoNothing({ target: jobDataTable.jobNumber });

        if (!insertedJobDataId || insertedJobDataId.length === 0) {
            return Promise.reject("Trying to create measure sheet for an existing job number.");
        }

        const jobDataId: number = insertedJobDataId[0].insertedId; // this is fragile
        const newCustomerInformation = measureSheet.customerInformation as
            typeof customerInformationTable.$inferInsert;
        newCustomerInformation.jobDataId = jobDataId;
        await db.insert(customerInformationTable).values(newCustomerInformation);
    } catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve();
}

const updateMeasureSheet = async (measureSheet: InsertMeasureSheet | SelectMeasureSheet): Promise<void> => {
    const newJobData = measureSheet.jobData as typeof jobDataTable.$inferInsert;
    if (!newJobData.id) {
        throw new Error("Id is missing");
    }
    try {
        await db.update(jobDataTable).set(newJobData).where(eq(jobDataTable.id, newJobData.id));
        const newCustomerInformation = measureSheet.customerInformation as
            typeof customerInformationTable.$inferInsert;
        if (!newCustomerInformation.jobDataId) {
            await db.insert(customerInformationTable).values(newCustomerInformation);
        } else {
            await db.update(customerInformationTable).set(newCustomerInformation)
                .where(eq(customerInformationTable.id, newCustomerInformation.id!));
        }
    } catch (e) {
        return Promise.reject(e);
    }
    return Promise.resolve();
}

const deleteMeasureSheetById = async (id: number | string) => {
    try {
        const lookupId = typeof id === "number" ? id : Number(id);
        await db.delete(jobDataTable).where(eq(jobDataTable.id, lookupId));
    } catch (e) {
        return Promise.reject(e);
    }
    return Promise.resolve();
}