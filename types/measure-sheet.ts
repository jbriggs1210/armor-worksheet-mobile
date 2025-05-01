import type CustomerInformation from "~/types/customer-information";

export default interface MeasureSheet {
    id: string;
    date: string;
    salesRep: string;
    customerInformation: CustomerInformation;
}