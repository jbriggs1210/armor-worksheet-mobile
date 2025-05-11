import type { MeasureSheet } from "~/types/measure-sheet";

export default function(): Ref<MeasureSheet> {
    const measureSheet: MeasureSheet = {
        id: null,
        jobNumber: "",
        salesRep: "",
        date: "",
        customerInformation: {
            id: null,
            name: "",
            streetNumber: "",
            streetName: "",
            lotNumber: "",
            cityTown: "",
            state: "",
            zipCode: "",
            plantation: "",
            mobile1: "",
            mobile2: "",
            home: "",
            builderSuperName: "",
            builderSuperMobile: "",
            measureSheetId: null
        },
    };

    return useState<MeasureSheet>("freshMeasureSheet", () => measureSheet);
}