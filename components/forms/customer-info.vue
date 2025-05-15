<script setup lang="ts">
import type { InsertMeasureSheet, SelectMeasureSheet } from "~/types/measure-sheet";
import { useMeasureSheetStore } from "~/stores/useMeasureSheetStore";

const measureSheetStore = useMeasureSheetStore();
const refs = storeToRefs(measureSheetStore);
const wipMeasureSheet: Ref<InsertMeasureSheet | SelectMeasureSheet> = refs.wipMeasureSheet;
</script>
<template>
  <div class="flex-container flex-row flex-center">
    <ion-item>
      <ion-input placeholder="Customer Name" v-model="wipMeasureSheet.customerInformation.name"></ion-input>
    </ion-item>
    <div id="address-section">
      <ion-item>
        <ion-input placeholder="Street Number" v-model="wipMeasureSheet.customerInformation.streetNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Street Name" v-model="wipMeasureSheet.customerInformation.streetName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Lot Number" v-model="wipMeasureSheet.customerInformation.lotNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="City/Town" v-model="wipMeasureSheet.customerInformation.cityTown"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="State" v-model="wipMeasureSheet.customerInformation.state"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Zip Code" v-model="wipMeasureSheet.customerInformation.zipCode"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Plantation" v-model="wipMeasureSheet.customerInformation.plantation"></ion-input>
      </ion-item>
    </div>
    <div id="telephone-section">
      <ion-item>
        <ion-input type="tel" placeholder="Mobile 1" v-model="wipMeasureSheet.customerInformation.mobile1"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Mobile 2" v-model="wipMeasureSheet.customerInformation.mobile2"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Home Phone" v-model="wipMeasureSheet.customerInformation.home"></ion-input>
      </ion-item>
    </div>
    <div id="builder-section">
      <ion-item>
        <ion-input placeholder="Builder/Super Name"
                   v-model="wipMeasureSheet.customerInformation.builderSuperName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Builder/Super Mobile"
                   v-model="wipMeasureSheet.customerInformation.builderSuperMobile"></ion-input>
      </ion-item>
    </div>
  </div>
</template>


<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-row {
  flex-direction: row;
}

.flex-center {
  justify-content: center;
}
</style>