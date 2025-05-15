<template>
  <ion-content class="ion-padding">
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="chevronUpCircle"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button href="/">
          <ion-icon :icon="home"></ion-icon>
        </ion-fab-button>
        <ion-fab-button href="/measure-sheets">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </ion-content>
</template>

<script setup lang="ts">
import { add, chevronUpCircle, home } from "ionicons/icons";
</script>

<style scoped>

</style>