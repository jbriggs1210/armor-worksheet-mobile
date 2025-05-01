<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>Armor Measure Sheet Generator</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-router-outlet/>
    </ion-content>
    <ion-footer>
      <fab-navigation />
    </ion-footer>
  </ion-app>
</template>
<script setup lang="ts">


import FabNavigation from "~/components/fab-navigation.vue";
</script>