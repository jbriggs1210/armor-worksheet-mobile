import { MeasureSheet } from "~/types/measure-sheet";
import { CustomerInformation } from "~/types/customer-information";

export function transformToApiMany(sheets: Array<any>) {
    return <MeasureSheet[]> sheets.map(sheet => {
        return transformToApiSingle(sheet);
    });
}

export function transformToApiSingle(sheet: any) {
    return <MeasureSheet>{
        id: sheet.measureSheet.id,
        jobNumber: sheet.measureSheet.jobNumber,
        date: new Date(sheet.measureSheet.date * 1000)?.toDateString(),
        salesRep: sheet.measureSheet.salesRep,
        customerInformation: <CustomerInformation>{
            id: sheet.customerInformation.id,
            name: sheet.customerInformation.name,
            streetNumber: sheet.customerInformation.streetNumber,
            streetName: sheet.customerInformation.streetName,
            lotNumber: sheet.customerInformation.lotNumber,
            cityTown: sheet.customerInformation.cityTown,
            state: sheet.customerInformation.state,
            zipCode: sheet.customerInformation.zipCode,
            plantation: sheet.customerInformation.plantation,
            mobile1: sheet.customerInformation.mobile1,
            mobile2: sheet.customerInformation.mobile2,
            home: sheet.customerInformation.home,
            builderSuperName: sheet.customerInformation.builderSuperName,
            builderSuperMobile: sheet.customerInformation.builderSuperMobile,
        }
    }
}