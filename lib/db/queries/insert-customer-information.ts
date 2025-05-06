import { type InsertCustomerInformation, customerInformationTable } from "~/lib/db/schema";
import { db } from "~/lib/db";

export async function createCustomerInformation(data: InsertCustomerInformation): Promise<void> {
    await db.insert(customerInformationTable).values(data);
}