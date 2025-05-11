import type { CustomerInformation } from "~/types/customer-information";

export interface MeasureSheet {
    id: number | null;
    jobNumber: string | null;
    date: string | null;
    salesRep: string | null;
    customerInformation: CustomerInformation;
}