<template>
  <ion-page>
  <main-header title="Armor Measure Sheets"></main-header>
  <ion-toolbar v-if="results && results.length > 0">
    <ion-searchbar placeholder="job # or customer name" @ionInput="handleJobIdSearch($event)"></ion-searchbar>
  </ion-toolbar>
  <ion-content>
    <div class="flex-container flex-row">
      <ion-card  class="add-padding" v-for="(sheet, index) in filteredResults" :key="index">
        <ion-card-title>{{ sheet.jobData.jobNumber }}</ion-card-title>
        <ion-card-subtitle>{{ formatToStringDate(sheet.jobData.date as number) }}</ion-card-subtitle>
        <ion-card-content>
          <ion-text>
            {{ sheet.customerInformation?.name || "N/A" }}
          </ion-text>
          <div>
            <ion-button size="small" @click="editCard(index)">
              Edit
            </ion-button>
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
import { format } from "date-fns";
import { onIonViewWillEnter, useIonRouter } from "@ionic/vue";
import type { SelectCustomerInformation, SelectJobData } from "~/lib/db/schema";
import { useMeasureSheetStore } from "~/stores/useMeasureSheetStore";
import useMeasureSheetsRepository from "~/composables/useMeasureSheetsRepository";

const results: Ref<{jobData: SelectJobData, customerInformation: SelectCustomerInformation | null}[]> = ref([]);
console.log(results.value);
onIonViewWillEnter( async () => {
  results.value = await useMeasureSheetsRepository().value.reads.findAll();
})

const filter = ref("");
const filteredResults: Ref<{jobData: SelectJobData, customerInformation: SelectCustomerInformation | null}[]> = computed(() => {
  return results.value.filter(result => {
    console.log(result.jobData.jobNumber);
    return result.jobData?.jobNumber?.includes(filter.value) ||
        result.customerInformation?.name?.toLowerCase().includes(filter.value.toLowerCase());
  })
});
const handleJobIdSearch = (event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) => {
  if (event.detail.value) {
    filter.value = event.detail.value.trim();
  } else {
    filter.value = "";
  }
};

const ionRouter = useIonRouter();
const measureSheetStore = useMeasureSheetStore();

const editCard = async (index: number) => {
  const element = filteredResults.value![index];
  console.debug(`Edit card with id ${element.jobData.id}`);
  await measureSheetStore.loadWipMeasureSheet(element.jobData.id);
  ionRouter.navigate({ path: `/measure-sheets/${element.jobData.id}` });
};
const deleteCard = async (index: number) => {
  const element = filteredResults.value![index];
  console.debug(`Deleting card with id ${element.jobData.id}`);
  await useMeasureSheetsRepository().value.deletes.single(element.jobData.id)
      .then(() => {
        results.value.splice(index, 1);
      }).catch((e: any | unknown) => {
        console.error(e);
      })
};

const presentDeleteModalAlert = async (index: number) => {
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

  await alert.present();
}

const formatToStringDate = (timestamp: number) => {
  const isoDate = new Date(timestamp).toISOString();
  return format(isoDate, "yyyy-MM-dd");
}
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.flex-row {
  flex-direction: row;
  row-gap: 1rem;
}

.add-padding {
  padding: 1em;
}
</style>