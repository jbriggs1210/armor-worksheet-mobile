<script setup lang="ts">
import type {FormatOptions, IonDatetimeCustomEvent} from "@ionic/core";
import type {MeasureSheet} from "~/types/measure-sheet";
import {useMeasureSheetsStore} from "~/stores/measure-sheets-store";
import {storeToRefs} from "pinia";

const measureSheetStore = useMeasureSheetsStore();
const currentMeasureSheet: Ref<MeasureSheet> = storeToRefs(measureSheetStore).workInProgressMeasureSheet;
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

</script>
<template>
  <div class="flex-container flex-row flex-center">
    <ion-item>
      <ion-input placeholder="Job #" v-model="currentMeasureSheet.jobNumber"></ion-input>
    </ion-item>
    <ion-item>
      <ion-datetime-button datetime="date"></ion-datetime-button>
      <ion-popover :keep-contents-mounted="true" dismiss-on-select="true">
        <ion-datetime
            presentation="date"
            :prefer-wheel="true"
            id="date"
            :format-options="dateTimeFormat"
            v-model="currentMeasureSheet.date"
            max="2050-01-01"
        ></ion-datetime>
        <ion-button @click="submitDateModal($event)">Submit</ion-button>
      </ion-popover>
    </ion-item>
    <ion-item>
      <ion-input placeholder="Sales Rep" v-model="currentMeasureSheet.salesRep"></ion-input>
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