import type { MeasureSheet } from "~/types/measure-sheet";
import useFreshMeasureSheet from "~/composables/useFreshMeasureSheet";

export const useMeasureSheetsStore = defineStore("measureSheetsStore", () => {
    const measureSheets: Ref<MeasureSheet[]> = ref([]);
    const workInProgressMeasureSheet: Ref<MeasureSheet> = ref(useFreshMeasureSheet());
    async function initialize(): Promise<void> {
        console.debug("MeasureSheetsStore initialized");
        measureSheets.value = await $fetch("/api/measure-sheets");
        console.debug(measureSheets.value);
    }
    const measureSheetsFilter: Ref<string> = ref("");
    const filteredMeasureSheets: Ref<MeasureSheet[]> = computed(() => {
        console.debug("MeasureSheetsFilter", measureSheetsFilter.value);
        if (measureSheetsFilter.value.length === 0) {
            return measureSheets.value;
        }
        return measureSheets.value!.filter(ms => {
            return ms.id!.toString().includes(measureSheetsFilter.value) ||
                ms.jobNumber!.includes(measureSheetsFilter.value) ||
                ms.customerInformation!.name?.toLowerCase().includes(measureSheetsFilter.value.toLowerCase())
        });
    });
    const totalMeasureSheets: Ref<number> = computed(() => measureSheets.value!.length);
    // const workInProgressMeasureSheetId: Ref<number|undefined> = ref();
    // const workInProgressMeasureSheet: Ref<MeasureSheet> = computed(() => {
    //     return measureSheets.value.find(ms => ms.id === workInProgressMeasureSheetId.value) ||
    //         useFreshMeasureSheet().value;
    // });
    async function retrieveMeasureSheet(id: number): Promise<any> {
        await $fetch(`/api/measure-sheets/${id}`, {
            method: "GET"
        }).then(res => {
            return res.json();
        })
    }
    async function saveWorkInProgressMeasureSheet(): Promise<void> {
        await $fetch(`/api/measure-sheets/${workInProgressMeasureSheet.value.id}`, {
            method: "POST",
            body: workInProgressMeasureSheet.value,
        })
    }
    return {
        workInProgressMeasureSheet,
        initialize,
        measureSheetsFilter,
        filteredMeasureSheets,
        totalMeasureSheets,
        // workInProgressMeasureSheetId,
        retrieveMeasureSheet,
        saveWorkInProgressMeasureSheet
    };
})