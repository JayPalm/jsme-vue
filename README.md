# JSME Vue

Vue wrapper for [JSME-Editor](https://github.com/jsme-editor/jsme-editor.github.io)

## Background
[SMILES](https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system) is a means of specifying the molecular structure of a chemical species as a string. 

This component wraps [JSME-Editor](https://github.com/jsme-editor/jsme-editor.github.io) in an easy to use Vue component. All credit to the original authors (Peter Ertl and Bruno Bienfait), as this package simply makes their chemical drawer easier to use in a Vue app. The core JSME-Editor is initialized by adding a script to the document head, which adds several more scripts neccessary for the editor to load and function.

## Installation
`jsme-vue` is available via [npm](https://www.npmjs.com/package/jsme-vue): `npm i jsme-vue`

## Example Usage

Used in a Vue component, using Composition API.

```vue
<template>
  <div class="mx-auto bg-blue-100 flex flex-row items-end">
    <JSME v-model="smiles" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const smiles = ref("c1ccccc1");

watch(smiles, () => {
  // Perform action on smiles change.
  console.log(smiles.value);
}

</script>
```
