import { defineStore } from "pinia";
import type { InsertMeasureSheet, SelectMeasureSheet } from "~/types/measure-sheet";
import useMeasureSheetsRepository from "~/composables/useMeasureSheetsRepository";

export const useMeasureSheetStore = defineStore("useMeasureSheetStore", () => {
    const wipMeasureSheet = ref<InsertMeasureSheet | SelectMeasureSheet>(
        {} as InsertMeasureSheet | SelectMeasureSheet
    );

    async function loadWipMeasureSheet(id?: string | number) {
        console.log(`loadWipMeasureSheet: ${id}`);
        if (id) {
            const data = await useMeasureSheetsRepository().value.reads.findById(id);
            console.debug(data);
            // todo: maybe figure this out at some point
            // @ts-ignore
            wipMeasureSheet.value = data;
            return;
        }
        wipMeasureSheet.value = freshMeasureSheet;
    }

    return {
        wipMeasureSheet,
        loadWipMeasureSheet,
    };
});

const freshMeasureSheet: InsertMeasureSheet | SelectMeasureSheet = {
    jobData: {
        id: undefined,
        jobNumber: "",
        date: undefined,
        salesRep: "",
    },
    customerInformation: {
        id: undefined,
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
        jobDataId: undefined,
    },
};