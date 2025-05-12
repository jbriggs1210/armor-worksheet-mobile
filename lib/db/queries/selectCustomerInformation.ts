import { db } from "~/lib/db";
import { customerInformationTable, type SelectCustomerInformationType } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

export async function selectCustomerInformation (page = 1, size = 100): Promise<Array<SelectCustomerInformationType>> {
    return db.select()
        .from(customerInformationTable);
}

export async function getCustomerNameForJobDataId(jobDataId: number): Promise<Array<any>> {
    return db.select({
        jobDataId: customerInformationTable.jobDataId,
        name: customerInformationTable.name
    })
        .from(customerInformationTable)
        .where(eq(customerInformationTable.jobDataId, jobDataId));
}