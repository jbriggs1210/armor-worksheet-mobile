<script setup lang="ts">
import type { MeasureSheet } from "~/types/measure-sheet";
import type { CustomerInformation } from "~/types/customer-information";
import { useMeasureSheetsStore } from "~/stores/measure-sheets-store";
import { storeToRefs } from "pinia";

const measureSheetStore = useMeasureSheetsStore();
const currentMeasureSheet: Ref<MeasureSheet> = storeToRefs(measureSheetStore).workInProgressMeasureSheet;
const currentMeasureSheetCustomerInfo: Ref<CustomerInformation> = ref(currentMeasureSheet.value.customerInformation);

</script>
<template>
  <div class="flex-container flex-row flex-center">
    <ion-item>
      <ion-input placeholder="Customer Name" v-model="currentMeasureSheetCustomerInfo.name"></ion-input>
    </ion-item>
    <div id="address-section">
      <ion-item>
        <ion-input placeholder="Street Number" v-model="currentMeasureSheetCustomerInfo.streetNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Street Name" v-model="currentMeasureSheetCustomerInfo.streetName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Lot Number" v-model="currentMeasureSheetCustomerInfo.lotNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="City/Town" v-model="currentMeasureSheetCustomerInfo.cityTown"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="State" v-model="currentMeasureSheetCustomerInfo.state"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Zip Code" v-model="currentMeasureSheetCustomerInfo.zipCode"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Plantation" v-model="currentMeasureSheetCustomerInfo.plantation"></ion-input>
      </ion-item>
    </div>
    <div id="telephone-section">
      <ion-item>
        <ion-input type="tel" placeholder="Mobile 1" v-model="currentMeasureSheetCustomerInfo.mobile1"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Mobile 2" v-model="currentMeasureSheetCustomerInfo.mobile2"></ion-input>
      </ion-item>
    </div>
    <div id="builder-section">
      <ion-item>
        <ion-input placeholder="Builder/Super Name"
                   v-model="currentMeasureSheetCustomerInfo.builderSuperName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Builder/Super Mobile"
                   v-model="currentMeasureSheetCustomerInfo.builderSuperMobile"></ion-input>
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