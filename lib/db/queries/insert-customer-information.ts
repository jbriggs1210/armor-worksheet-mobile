import { type InsertCustomerInformation, customerInformationTable } from "~/lib/db/schema";
import { db } from "~/lib/db";

export async function createCustomerInformation(data: InsertCustomerInformation): Promise<void> {
    const id = data.id;
    if (id) {
        throw new Error("Trying to create new customer information with an id.");
    }

    await db.insert(customerInformationTable).values(data);
}

export async function updateCustomerInformation(data: InsertCustomerInformation): Promise<void> {
    const id = data.id;
    if (!id) {
        throw new Error("Trying to update customer information without valid id.");
    }
    await db.insert(customerInformationTable).values(data);
}