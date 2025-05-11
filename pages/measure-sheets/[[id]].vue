<template>
  <ion-page>
  <main-header title="Measure Sheet"></main-header>
  <ion-content class="ion-padding">
    <!-- form(s) / wizard for completing measure-sheet -->
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
    <job-data-form v-if="showFormComponent('Job Data')"></job-data-form>
    <customer-info-form v-else-if="showFormComponent('Customer Info')"></customer-info-form>
    <trim-options-form v-else-if="showFormComponent('Trim Options')"></trim-options-form>
    <home-details-form v-else-if="showFormComponent('Home Details')"></home-details-form>
    <door-details-form v-else-if="showFormComponent('Door Details')"></door-details-form>
    <product-details-form v-else-if="showFormComponent('Product Details')"></product-details-form>
    <div class="save-container flex-container flex-row-reverse">
      <ion-button fill="solid" @click="saveMeasureSheet">Save</ion-button>
    </div>
  </ion-content>
  <main-footer></main-footer>
  </ion-page>
</template>
<script setup lang="ts">
import JobDataForm from "~/components/forms/job-data-form.vue";
import type {IonButtonCustomEvent} from "@ionic/core";
import {useRoute} from 'vue-router'; // workaround for issue with auto-import
import CustomerInfoForm from "~/components/forms/customer-info-form.vue";
import TrimOptionsForm from "~/components/forms/trim-options-form.vue";
import HomeDetailsForm from "~/components/forms/home-details-form.vue";
import DoorDetailsForm from "~/components/forms/door-details-form.vue";
import ProductDetailsForm from "~/components/forms/product-details-form.vue";
import {useMeasureSheetsStore} from "~/stores/measure-sheets-store";
import {storeToRefs} from "pinia";
import type {MeasureSheet} from "~/types/measure-sheet";

const r = useRoute();
const id: number = +r.params.id!;
const measureSheetStore = useMeasureSheetsStore();
const workInProgressMeasureSheet: Ref<MeasureSheet> = storeToRefs(measureSheetStore).workInProgressMeasureSheet;
const saveWorkInProgressMeasureSheet = measureSheetStore.saveWorkInProgressMeasureSheet;
// onMounted(() => {
//   if (id) {
//     useFetch<MeasureSheet>(`/api/measure-sheets/${id}`)
//         .then(resolved => {
//           workInProgressMeasureSheet.value = JSON.parse(JSON.stringify(resolved.data.value));
//           console.log(workInProgressMeasureSheet);
//         })
//   }
// })

const currentFormPage = ref("Job Data");
const saveMeasureSheet = () => {
  console.log("saveMeasureSheet");
  saveWorkInProgressMeasureSheet();
};
const updateFormPage = (event: IonButtonCustomEvent<any>) => {
  console.log("updateFormPage");
  console.log(event.target.innerHTML);
  currentFormPage.value = event.target.innerHTML;
}

const calculateButtonFill = (pageName: string) => {
  console.log("calculateButtonFill");
  const outline = "outline";
  const solid = "solid";

  return currentFormPage.value === pageName ? solid : outline;
}

const showFormComponent = (componentName: string) => {
  return componentName === currentFormPage.value;
}
</script>
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