import type CustomerInformation from "~/types/customer-information";

export interface MeasureSheet {
    id: string;
    date: string;
    salesRep: string;
    customerInformation: CustomerInformation;
}