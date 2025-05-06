import {selectMeasureSheetById, selectMeasureSheets} from "~/lib/db/queries/select-measure-sheet";
import { MeasureSheet } from "~/types/measure-sheet";
import { CustomerInformation } from "~/types/customer-information";

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        const id = event.path
        const sheets = await selectMeasureSheetById(123456);
        return transformToApi(sheets);
    }
});

function transformToApi(sheets: Array<any>) {
    return <MeasureSheet[]> sheets.map(s => {
        return <MeasureSheet>{
            id: s.measureSheet.id,
            jobNumber: s.measureSheet.jobNumber,
            date: new Date(s.measureSheet.date * 1000)?.toDateString(),
            salesRep: s.measureSheet.salesRep,
            customerInformation: <CustomerInformation>{
                id: s.customerInformation.id,
                name: s.customerInformation.name,
                streetNumber: s.customerInformation.streetNumber,
                streetName: s.customerInformation.streetName,
                lotNumber: s.customerInformation.lotNumber,
                cityTown: s.customerInformation.cityTown,
                state: s.customerInformation.state,
                zipCode: s.customerInformation.zipCode,
                plantation: s.customerInformation.plantation,
                mobile1: s.customerInformation.mobile1,
                mobile2: s.customerInformation.mobile2,
                home: s.customerInformation.home,
                builderSuperName: s.customerInformation.builderSuperName,
                builderSuperMobile: s.customerInformation.builderSuperMobile,
            }
        }
    });
}