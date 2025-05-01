<script setup lang="ts">
import {type IonDatetimeCustomEvent} from "@ionic/core";

const blankMeasureSheet = ref({
  id: "",
  date: Date.now(),
  salesRep: ""
  /*"customerInformation": {
    "name": "Front Light",
    "streetNumber": "452",
    "streetName": "Corley St",
    "cityTown": "",
    "state": "SC",
    "zipCode": "",
    "plantation": "Palmetto Bluff",
    "mobile1": "",
    "mobile2": "",
    "home": "",
    "builderSuperName": "Craig",
    "builderSuperMobile": "843-384-0250"
  },
  "homeDetails": {
    "tentativeInstallDate": "",
    "readyForInstall": false,
    "sidingOptions": {
      "hardie": true,
      "stucco": false,
      "vinyl": false,
      "stone": false,
      "concrete": false,
      "color": ""
    },
    "trimOptions": {
      "topAndBottom": false,
      "allAround": true,
      "none": false,
      "keystone": false,
      "headerStickOut": false,
      "sillStickOut": false,
      "headerFlush": false,
      "sillFlush": false,
      "color": ""
    },
    "doorDetails": {
      "roomUnderDoor": "",
      "concreteFloor": "",
      "brickStoneTile": "",
      "sillInPlace": "",
      "brickStoneTileWithConcreteUnder": ""
    }
  },
  "products": {
    "desiredColor": {
      "code": "SW1673",
      "name": "Vermont Slate"
    },
    "options": {
      "osb": false,
      "galv": false,
      "alum": false,
      "fabric": false,
      "accordions": false,
      "rolldown": false,
      "bahCol": false,
      "lexan": false,
      "screenUnder": false,
      "lanaiUnder": false,
      "poolEnclosure": false,
      "paintedCaps": false,
      "bahArticulating": false,
      "decoBah": false,
      "composite": true,
      "compositeSpecific": "Louver",
      "cutout": "",
      "directMount": false,
      "armorTrack": false,
      "header": false,
      "flatTrack": false
    }
  },
  "measureInformation": {
  }*/
});

const submitDateModal = (event: IonDatetimeCustomEvent<any>) => {
  console.debug(`submitDateModal event:`);
  console.debug(event);
};

const saveMeasureSheet = () => {
  console.log(blankMeasureSheet);
};
</script>
<template>
  <ion-content class="ion-padding">
    <!-- form(s) / wizard for completing measure-sheet -->
    <ion-toolbar>
      <ion-buttons class="flex-container flex-row flex-center">
        <ion-button fill="outline">Customer Info</ion-button>
        <ion-button fill="outline">Home Details</ion-button>
        <ion-button fill="outline">Trim Options</ion-button>
        <ion-button fill="outline">Door Details</ion-button>
        <ion-button fill="outline">Product Details</ion-button>
      </ion-buttons>
    </ion-toolbar>
    <div class="flex-container flex-row flex-center">
      <ion-item>
        <ion-input placeholder="job id" v-model="blankMeasureSheet.id"></ion-input>
      </ion-item>
      <ion-item>
        <ion-datetime-button datetime="date" v-model="blankMeasureSheet.date"></ion-datetime-button>
        <ion-popover :keep-contents-mounted="true" dismiss-on-select="true">
          <ion-datetime presentation="date" :prefer-wheel="true" id="date"></ion-datetime>
          <ion-button @click="submitDateModal($event)">Submit</ion-button>
        </ion-popover>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Sales Rep" v-model="blankMeasureSheet.salesRep"></ion-input>
      </ion-item>
    </div>
    <div class="save-container flex-container flex-row-reverse">
      <ion-button fill="solid" @click="saveMeasureSheet">Save</ion-button>
    </div>
  </ion-content>
</template>


<style scoped>
.save-container {
  max-width: 80%;
  margin: auto;
}

.flex-container {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

.flex-center {
  justify-content: center;
}
</style>