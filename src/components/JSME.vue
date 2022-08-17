<template>
  <div>
    <div :id="props.id"></div>
    {{ jsmeIsLoadedInternal ? "" : "JSME is loading, or JS is disabled" }}

    <div>Smiles: {{ smilesString }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, getCurrentInstance, ref } from "vue";
import { useScriptTag } from "@vueuse/core";

const props = defineProps({
  width: { type: String, default: "800px" },
  height: { type: String, default: "500px" },
  id: { type: String, default: "JME" },
  smiles: { type: String, default: "" },
  options: { type: String, default: "" },
  onChance: { type: Function, required: false },
  src: { type: String, default: "" },
  border: { type: String, default: "5px solid black" },

  code: { type: String, default: "JME.class" },
  name: { type: String, default: "JME1" },
  archive: { type: String, default: "JME.jar" },
});
const emit = defineEmits(["change"]);

const jmeRef = ref(null);
const smilesString = ref(props.smiles);

const src = ref(props.src || "./node_modules/jsme-editor/jsme.nocache.js");
console.log(src.value);
let jsmeIsLoaded = false;
const jsmeIsLoadedInternal = ref(false);

type JsmeEvent = {
  src: any;
};

// Include JSME Script
const newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.src = src.value;

document.head.appendChild(newScript);

window.jsmeOnLoad = () => {
  jsmeIsLoaded = true;

  console.log("JSME-Editor module loaded");
  let JSA = new (window.JSApplet.JSME as unknown as JSME)(
    props.id,
    props.width,
    props.height
  );

  JSA.readGenericMolecularInput(smilesString.value);

  JSA.setCallBack("AfterStructureModified", (e: JsmeEvent) => {
    smilesString.value = e.src.smiles();
    emit("change", e.src.smiles());
  });
  jsmeIsLoadedInternal.value = true;
};
// });
</script>
