<template>
  <ion-page>
  <main-header title="Armor Measure Sheets"></main-header>
  <ion-toolbar v-if="totalMeasureSheets > 0">
    <ion-searchbar placeholder="job # or customer name" @ionInput="handleJobIdSearch($event)"></ion-searchbar>
  </ion-toolbar>
  <ion-content>
    <div class="flex-container flex-row">
      <ion-card v-for="(sheet, index) in filteredMeasureSheets" :key="index">
        <ion-card-title>{{ sheet.jobNumber || sheet.id }}</ion-card-title>
        <ion-card-subtitle>{{ sheet.date }}</ion-card-subtitle>
        <ion-card-content>
          <ion-text>
            {{ sheet.customerInformation.name }}
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

const measureSheetsStore = useMeasureSheetsStore();
const totalMeasureSheets: Ref<number> = storeToRefs(measureSheetsStore).totalMeasureSheets;
const measureSheetsFilter: Ref<string> = storeToRefs(measureSheetsStore).measureSheetsFilter;
const filteredMeasureSheets: Ref<MeasureSheet[]> = storeToRefs(measureSheetsStore).filteredMeasureSheets;

const handleJobIdSearch = (event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) => {
  if (event!.detail!.value !== undefined) {
    measureSheetsFilter.value = event!.detail!.value!.valueOf();
  } else {
    measureSheetsFilter.value = "";
  }
};

// const ionRouter = useIonRouter();
// const editCard = (index: number) => {
//   const element = filteredMeasureSheets.value![index];
//   console.debug(`Edit card with id ${element.id}`);
//   ionRouter.navigate({ path: `/measure-sheets/${element.id}` });
// };
const deleteCard = (index: number) => {
  const element = filteredMeasureSheets.value![index];
  console.debug(`Deleting card with id ${element.id}`);
  filteredMeasureSheets.value!.splice(index, 1);
};

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
        deleteCard(index);
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