<template>
  <ion-app>
    <ion-content>
      <ion-router-outlet/>
    </ion-content>
  </ion-app>
</template>
<script setup lang="ts">
import {useMeasureSheetsStore} from "~/stores/measure-sheets-store";

const measureSheetStore = useMeasureSheetsStore();
measureSheetStore.initialize(); // Loads Measure Sheets from DB into store
</script>