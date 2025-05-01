<script setup lang="ts">
import type {FormatOptions, IonDatetimeCustomEvent} from "@ionic/core";
import useWorkInProgressMeasureSheet from "~/composables/useWorkInProgressMeasureSheet";

const wipMeasureSheet = useWorkInProgressMeasureSheet();
wipMeasureSheet.value.date = new Date().toISOString();

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
      <ion-input placeholder="job id" v-model="wipMeasureSheet.id"></ion-input>
    </ion-item>
    <ion-item>
      <ion-datetime-button datetime="date"></ion-datetime-button>
      <ion-popover :keep-contents-mounted="true" dismiss-on-select="true">
        <ion-datetime
            presentation="date"
            :prefer-wheel="true"
            id="date"
            :format-options="dateTimeFormat"
            v-model="wipMeasureSheet.date"
            max="2050-01-01"
        ></ion-datetime>
        <ion-button @click="submitDateModal($event)">Submit</ion-button>
      </ion-popover>
    </ion-item>
    <ion-item>
      <ion-input placeholder="Sales Rep" v-model="wipMeasureSheet.salesRep"></ion-input>
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