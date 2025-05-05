<script setup lang="ts">
const props = defineProps<{ title?: String}>();
</script>
<template>
  <slot name="start"></slot>
  <ion-header>
    <ion-toolbar>
      <ion-title> {{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <slot name="end"></slot>
</template>


<style scoped>

</style>