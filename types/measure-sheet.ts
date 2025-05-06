import type { CustomerInformation } from "~/types/customer-information";

export interface MeasureSheet {
    id: number;
    jobNumber: string;
    date: string;
    salesRep: string;
    customerInformation: CustomerInformation;
}