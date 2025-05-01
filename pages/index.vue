<template>
  <ion-toolbar v-if="measureSheets.length > 0">
    <ion-searchbar placeholder="job # or customer name" @ionInput="handleJobIdSearch($event)"></ion-searchbar>
  </ion-toolbar>
  <ion-content>
    <div class="flex-container flex-row">
      <ion-card class="ion-" v-for="(sheet, index) in filteredMeasureSheets" :key="index">
        <ion-card-title>{{ sheet.id }}</ion-card-title>
        <ion-card-subtitle>{{ sheet.date }}</ion-card-subtitle>
        <ion-card-content>
          <ion-text>
            {{ sheet.customerInformation.name }}
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
</template>

<script setup lang="ts">
import useMeasureSheets from "~/composables/useMeasureSheets";
import type { IonSearchbarCustomEvent, SearchbarChangeEventDetail } from "@ionic/core";

const measureSheets: Ref<any[]> = ref(useMeasureSheets());
const filterQuery: Ref<any> = ref("");
const filteredMeasureSheets = computed(() => {
  return measureSheets.value.filter(measureSheet => {
    if (filterQuery.value === null || filterQuery.value.length === 0) {
      return true;
    }
    return measureSheet.id.includes(filterQuery.value) ||
        measureSheet.customerInformation.name.toUpperCase().includes(filterQuery.value.toUpperCase());
  });
})
const handleJobIdSearch = (event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) => {
  console.debug(`handleJobIdSearch event: ${event.detail.value}`);
  filterQuery.value = event.detail.value;
};

const editCard = (index: number) => {
  const element = measureSheets.value[index];
  console.debug(`Edit card with id ${element.id}`);
};
const deleteCard = (index: number) => {
  const element = measureSheets.value[index];
  console.debug(`Deleting card with id ${element.id}`);
  measureSheets.value.splice(index, 1);
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