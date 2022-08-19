<script setup lang="ts">
import { ref, watch } from "vue";
import JSME from "./components/";

const sampleSmiles = "CCCNCc1ccccc1";
const smilesString = ref(sampleSmiles);

watch(smilesString, (newVal) => console.log(`From App.vue: ${newVal}`));
</script>

<template>
  <JSME v-model="smilesString" id="JSME1" />

  <button @click="() => (smilesString = sampleSmiles)">Click to reset</button>

  <div>
    Value: <span>{{ smilesString }}</span>
  </div>
</template>
