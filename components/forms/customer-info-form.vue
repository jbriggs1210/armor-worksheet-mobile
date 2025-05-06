<script setup lang="ts">
import type {MeasureSheet} from "~/types/measure-sheet";
import useFreshMeasureSheet from "~/composables/useFreshMeasureSheet";

const { sheetId } = defineProps<{ sheetId: string}>();
const savedMeasureSheets: Ref<MeasureSheet[]> = await useSavedMeasureSheets();
const currentMeasureSheet = savedMeasureSheets.value.find(ms => sheetId && ms.id === sheetId) ?? useFreshMeasureSheet();

</script>
<template>
  <div class="flex-container flex-row flex-center">
    <ion-item>
      <ion-input placeholder="Customer Name" v-model="currentMeasureSheet.customerInformation.name"></ion-input>
    </ion-item>
    <div id="address-section">
      <ion-item>
        <ion-input placeholder="Street Number" v-model="currentMeasureSheet.customerInformation.streetNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Street Name" v-model="currentMeasureSheet.customerInformation.streetName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Lot Number" v-model="currentMeasureSheet.customerInformation.lotNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="City/Town" v-model="currentMeasureSheet.customerInformation.cityTown"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="State" v-model="currentMeasureSheet.customerInformation.state"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Zip Code" v-model="currentMeasureSheet.customerInformation.zipCode"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Plantation" v-model="currentMeasureSheet.customerInformation.plantation"></ion-input>
      </ion-item>
    </div>
    <div id="telephone-section">
      <ion-item>
        <ion-input type="tel" placeholder="Mobile 1" v-model="currentMeasureSheet.customerInformation.mobile1"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Mobile 2" v-model="currentMeasureSheet.customerInformation.mobile2"></ion-input>
      </ion-item>
    </div>
    <div id="builder-section">
      <ion-item>
        <ion-input placeholder="Builder/Super Name"
                   v-model="currentMeasureSheet.customerInformation.builderSuperName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input type="tel" placeholder="Builder/Super Mobile"
                   v-model="currentMeasureSheet.customerInformation.builderSuperMobile"></ion-input>
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