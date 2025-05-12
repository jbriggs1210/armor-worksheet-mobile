<template>
  <ion-page>
  <main-header title="Armor Measure Sheets"></main-header>
  <ion-toolbar v-if="jobData!.length > 0">
    <ion-searchbar placeholder="job # or customer name" @ionInput=""></ion-searchbar>
  </ion-toolbar>
  <ion-content>
    <div class="flex-container flex-row">
      <ion-card v-for="(jd, index) in jobData" :key="index">
        <ion-card-title>{{ jd.jobNumber || jd.id }}</ion-card-title>
        <ion-card-subtitle>{{ jd.date }}</ion-card-subtitle>
        <ion-card-content>
          <ion-text>
            customer name
          </ion-text>
          <div>
<!--            <ion-button size="small" @click="editCard(index)">-->
<!--              Edit-->
<!--            </ion-button>-->
            <ion-button size="small" @click="presentDeleteModalAlert(index)">
              Delete
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
  <main-footer></main-footer>
  </ion-page>
</template>

<script setup lang="ts">
import type { IonSearchbarCustomEvent, SearchbarChangeEventDetail } from "@ionic/core";
import {useIonRouter} from "@ionic/vue";
import { useMeasureSheetsStore } from "~/stores/measure-sheets-store";
import type {MeasureSheet} from "~/types/measure-sheet";
import {
  type SelectCustomerInformationType,
  SelectJobData, type SelectJobDataType,
  type SelectJobDataWithCustomerInfoType
} from "~/lib/db/schema";

const { data: jobData } = await useFetch("/api/measure-sheets/job-data");

// const measureSheets = data.value;
// const totalMeasureSheets = computed(() => measureSheets!.length || 0);
// const measureSheetsFilter = ref("");
// const filteredData: Ref<Array<SelectJobDataType & SelectCustomerInformationType>> = computed(() => {
//   console.log(data);
//   if (measureSheetsFilter.value.length === 0) {
//     return data;
//   }
//   return measureSheets?.filter(ms => {
//     const jd = ms.jobData;
//     const ci = ms.customerInformation;
//     return jd.id!.toString().includes(measureSheetsFilter.value) ||
//         jd.jobNumber!.includes(measureSheetsFilter.value) ||
//         ci!.name?.toLowerCase().includes(measureSheetsFilter.value.toLowerCase())
//   });
// })
// const handleJobIdSearch = (event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) => {
//   if (event!.detail!.value !== undefined) {
//     measureSheetsFilter.value = event!.detail!.value!.valueOf();
//   } else {
//     measureSheetsFilter.value = "";
//   }
// };

// const ionRouter = useIonRouter();
// const editCard = (index: number) => {
//   const element = filteredMeasureSheets.value![index];
//   console.debug(`Edit card with id ${element.id}`);
//   ionRouter.navigate({ path: `/measure-sheets/${element.id}` });
// };
// const deleteCard = (index: number) => {
//   const element = filteredMeasureSheets.value![index];
//   console.debug(`Deleting card with id ${element.id}`);
//   filteredMeasureSheets.value!.splice(index, 1);
// };

const presentDeleteModalAlert = async (index: number) => {
  console.debug(`Alert modal being created for card with index ${index}`);
  const alert = await alertController.create({
    header: 'Delete Measure Sheet?',
    message: 'Are you sure you want to delete this measure sheet?',
    buttons: [{
      text: "Cancel",
      role: "Cancel",
      handler: () => {
        console.debug(`Cancel alert with index ${index}`);
      }
    }, {
      text: "Confirm",
      role: "Confirm",
      handler: () => {
        console.debug(`Confirm alert with data ${index}`);
        // deleteCard(index);
      }
    }],
  });

  console.debug(`Creating alert modal`);
  await alert.present();
}
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
}

.flex-row {
  flex-direction: row;
}
</style>