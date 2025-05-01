import type MeasureSheet from "~/types/measure-sheet";

export default function(): Ref<MeasureSheet> {
    const measureSheet: MeasureSheet = {
        id: "",
        salesRep: "",
        date: "",
        customerInformation: {
            name: "",
            streetNumber: "",
            streetName: "",
            cityTown: "",
            state: "",
            zipCode: "",
            plantation: "",
            mobile1: "",
            mobile2: "",
            home: "",
            builderSuperName: "",
            builderSuperMobile: "",
        },
    };

    return useState<MeasureSheet>("workInProgressMeasureSheet", () => measureSheet);
}