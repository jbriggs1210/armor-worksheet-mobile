import type {
    InsertCustomerInformation,
    InsertJobData,
    SelectCustomerInformation,
    SelectJobData
} from "~/lib/db/schema";

export type InsertMeasureSheet = {
    jobData: InsertJobData,
    customerInformation: InsertCustomerInformation
};

export type SelectMeasureSheet = {
    jobData: SelectJobData | InsertJobData,
    customerInformation: SelectCustomerInformation | InsertCustomerInformation
}
