<script setup lang="ts">
import type { IonButtonCustomEvent } from "@ionic/core";
import { useMeasureSheetStore } from "~/stores/useMeasureSheetStore";
import { alertController, useIonRouter } from "@ionic/vue";
import useMeasureSheetsRepository from "~/composables/useMeasureSheetsRepository";

const measureSheetStore = useMeasureSheetStore();
measureSheetStore.loadWipMeasureSheet();
const { wipMeasureSheet } = storeToRefs(measureSheetStore);
const currentFormPage = ref("Job Data");
const ionRouter = useIonRouter();

const presentErrorModalAlert = async (e: Error) => {
  console.error(e);
  const alert = await alertController.create({
    header: "Error",
    message: e.message || ""+e,
    buttons: [{
      text: "OK",
      role: "Ok",
      handler: () => {
        console.debug(`Alert for error acknowledged`);
      }
    }],
  });

  await alert.present();
}

const saveMeasureSheet = () => {
  const result = useMeasureSheetsRepository().value.creates.single(wipMeasureSheet.value);
  result.then(r => {
    console.log("Saved measure sheet");
    currentFormPage.value = "Job Data";
    ionRouter.navigate({path: "/"});
  }).catch(e => {
    presentErrorModalAlert(e);
  })
};
const updateFormPage = (event: IonButtonCustomEvent<any>) => {
  currentFormPage.value = event.target.innerHTML;
};

const calculateButtonFill = (pageName: string) => {
  const outline = "outline";
  const solid = "solid";

  return currentFormPage.value === pageName ? solid : outline;
};

const showFormComponent = (componentName: string) => {
  return componentName === currentFormPage.value;
};
</script>
<template>
  <ion-page>
    <main-header title="Measure Sheet"></main-header>
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-buttons class="flex-container flex-row flex-center">
          <ion-button :fill="calculateButtonFill('Job Data')" @click="updateFormPage($event)">Job Data</ion-button>
          <ion-button :fill="calculateButtonFill('Customer Info')" @click="updateFormPage($event)">Customer Info</ion-button>
          <ion-button :fill="calculateButtonFill('Home Details')" @click="updateFormPage($event)">Home Details</ion-button>
          <ion-button :fill="calculateButtonFill('Trim Options')" @click="updateFormPage($event)">Trim Options</ion-button>
          <ion-button :fill="calculateButtonFill('Door Details')" @click="updateFormPage($event)">Door Details</ion-button>
          <ion-button :fill="calculateButtonFill('Product Details')" @click="updateFormPage($event)">Product Details</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <forms-job-data v-if="showFormComponent('Job Data')"></forms-job-data>
      <forms-customer-info v-else-if="showFormComponent('Customer Info')"></forms-customer-info>
      <forms-trim-options v-else-if="showFormComponent('Trim Options')"></forms-trim-options>
      <forms-home-details v-else-if="showFormComponent('Home Details')"></forms-home-details>
      <forms-door-details v-else-if="showFormComponent('Door Details')"></forms-door-details>
      <forms-product-details v-else-if="showFormComponent('Product Details')"></forms-product-details>
      <div class="save-container flex-container flex-row-reverse">
        <ion-button fill="solid" @click="saveMeasureSheet">Save</ion-button>
      </div>
    </ion-content>
    <main-footer></main-footer>
  </ion-page>
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

.save-container {
  max-width: 80%;
  margin: auto;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}
</style>