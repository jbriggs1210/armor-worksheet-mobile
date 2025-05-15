<script setup lang="ts">
import type { DatetimeChangeEventDetail, FormatOptions, IonDatetimeCustomEvent } from "@ionic/core";
import type { InsertMeasureSheet, SelectMeasureSheet } from "~/types/measure-sheet";
import { useMeasureSheetStore } from "~/stores/useMeasureSheetStore";

const measureSheetStore = useMeasureSheetStore();
const refs = storeToRefs(measureSheetStore);
const wipMeasureSheet: Ref<InsertMeasureSheet | SelectMeasureSheet> = refs.wipMeasureSheet;
const dateTimeFormat: FormatOptions = {
  date: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  },
};

const submitDateModal = (event: IonDatetimeCustomEvent<any>) => {
  console.debug(`submitDateModal event:`);
  console.debug(event);
};

const convertToDateString = (timestamp: number | null | undefined): string => {
  if (!timestamp) {
    return new Date(Date.now()).toISOString();
  }
  return new Date(timestamp).toISOString();
};

const convertToTimestamp = (event: DatetimeChangeEventDetail): number => {
  const dateString: string = "" + event;
  wipMeasureSheet.value.jobData.date = new Date(dateString).getTime();
  return wipMeasureSheet.value.jobData.date;
};
</script>
<template>
  <div class="flex-container flex-row flex-center">
    <ion-item>
      <ion-input v-if="wipMeasureSheet.jobData!.id! === undefined" placeholder="Job #" v-model="wipMeasureSheet.jobData.jobNumber"></ion-input>
      <ion-input v-else-if="wipMeasureSheet.jobData.id" disabled v-model="wipMeasureSheet.jobData.jobNumber"></ion-input>
    </ion-item>
    <ion-item>
      <ion-datetime-button datetime="date"></ion-datetime-button>
      <ion-popover :keep-contents-mounted="true" dismiss-on-select="true">
        <ion-datetime
            presentation="date"
            :prefer-wheel="true"
            id="date"
            :format-options="dateTimeFormat"
            :modelValue="convertToDateString(wipMeasureSheet.jobData.date)"
            @update:modelValue="$event => convertToTimestamp($event)"
            max="2050-01-01"
        ></ion-datetime>
        <ion-button @click="submitDateModal($event)">Submit</ion-button>
      </ion-popover>
    </ion-item>
    <ion-item>
      <ion-input placeholder="Sales Rep" v-model="wipMeasureSheet.jobData.salesRep"></ion-input>
    </ion-item>
  </div>
</template>


<style scoped>
.flex-container {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-center {
  justify-content: center;
}
</style>