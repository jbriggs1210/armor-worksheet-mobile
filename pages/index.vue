<template>
  <ion-page>
    <main-header title="Armor Measure Sheets"></main-header>
    <ion-toolbar v-if="results && results.length > 0">
      <ion-searchbar placeholder="job # or customer name" @ionInput="handleJobIdSearch($event)"></ion-searchbar>
    </ion-toolbar>
    <ion-content>
      <div class="flex-container flex-row">
        <ion-card class="add-padding" v-for="(sheet, index) in filteredResults" :key="index">
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
              <ion-button size="small" @click="handlePdfClick(index)">
                PDF
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
import { Capacitor } from '@capacitor/core';
import useGeneratePdfRepository from "~/composables/useGeneratePdfRepository";
import type { SelectMeasureSheet } from "~/types/measure-sheet";

const results: Ref<{ jobData: SelectJobData, customerInformation: SelectCustomerInformation | null }[]> = ref([]);
console.log(results.value);
onIonViewWillEnter(async () => {
  // fixme: typescript things here
  results.value = await useMeasureSheetsRepository().value.reads.findAll();
});

const filter = ref("");
const filteredResults: Ref<{
  jobData: SelectJobData,
  customerInformation: SelectCustomerInformation | null
}[]> = computed(() => {
  return results.value.filter(result => {
    console.log(result.jobData.jobNumber);
    return result.jobData?.jobNumber?.includes(filter.value) ||
        result.customerInformation?.name?.toLowerCase().includes(filter.value.toLowerCase());
  });
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
  ionRouter.navigate({path: `/measure-sheets/${element.jobData.id}`});
};
const deleteCard = async (index: number) => {
  const element = filteredResults.value![index];
  console.debug(`Deleting card with id ${element.jobData.id}`);
  await useMeasureSheetsRepository().value.deletes.single(element.jobData.id)
      .then(() => {
        results.value.splice(index, 1);
      }).catch((e: any | unknown) => {
        console.error(e);
      });
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
};
const formatToStringDate = (timestamp: number) => {
  const isoDate = new Date(timestamp).toISOString();
  return format(isoDate, "yyyy-MM-dd");
};

const handlePdfClick = (index: number) => {
  const element = filteredResults.value![index];
  const id = element.jobData.id;
  const repository = useGeneratePdfRepository();
  // check for existing pdf
  repository.value.read(id)
      .then(r => {
        for (const rec in r) {
          console.log(rec);
        }
      }).catch(e => {
        console.error(e);
  });
}

const saveAsPdf = (index: number) => {
  const element = filteredResults.value![index];
  const id = element.jobData.id;
  const wasCreated: boolean = useGeneratePdfRepository().value.create((element as unknown) as SelectMeasureSheet);
}

const generatePdf = (index: number) => {
  const element = filteredResults.value![index];
  const id = element.jobData.id;
  console.debug(`Generating PDF for measure sheet ${element.jobData.jobNumber}`);
  const platform = Capacitor.getPlatform();
  console.log(`Running on: ${platform}`);


  // todo: refactor to save pdf to db?
  // const wip = usePdfFactory(element).value;
  // if (platform === "web") {
  //   wip.getBase64(async (data) => {
  //     const fileName = `/measure-sheets/${element.jobData.jobNumber}_measure_sheet_${Date.now()}.pdf`;
  //     window.open(fileName, "_blank");
  //     const uri = await Filesystem.writeFile({
  //       directory: Directory.ExternalStorage,
  //       path: fileName,
  //       recursive: true,
  //       data: data,
  //     }).then(result => {
  //       console.log(result);
  //     }).catch(e => {
  //       console.error(e);
  //     });
  //     console.log(uri);
  //   });
  // } else {
  //   wip.getBase64(async (data) => {
  //     const uri = await Filesystem.writeFile({
  //       directory: Directory.ExternalStorage,
  //       path: `/measure-sheets/${element.jobData.jobNumber}_measure_sheet_${Date.now()}.pdf`,
  //       recursive: true,
  //       data: data,
  //     }).then(result => {
  //       console.log(result);
  //     }).catch(e => {
  //       console.error(e);
  //     });
  //     console.log(uri);
  //   });
  // }
};
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