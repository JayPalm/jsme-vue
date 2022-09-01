<template>
  <div>
    <div
      :style="{
        width: props.width,
        height: props.height,
        outline: jsmeIsLoadedInternal ? '' : '1px solid black',
        outlineOffset: '-.5px',
        textAlign: 'center',
      }"
    >
      <div :id="props.id"></div>
      <div
        v-if="!jsmeIsLoadedInternal"
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          '-webkit-transform': 'translate(-50%, -50%)',
        }"
      >
        JSME is loading, or JS is disabled
      </div>
    </div>
    <div>
      <div v-if="jsmeIsLoadedInternal">
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
          "
        >
          <span>Smiles:</span>
          <div style="width: 100%">
            <input
              type="text"
              placeholder="Enter Smiles"
              style="width: 98%"
              :value="props.modelValue"
              v-on:input="(e) => updateValue(e)"
              v-on:change="(e) => updateValue(e)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, getCurrentInstance, ref, watch } from "vue";

const props = defineProps({
  width: { type: String, default: "800px" },
  height: { type: String, default: "500px" },
  id: { type: String, default: "JME" + Math.random() },
  options: { type: String, default: "" },
  onChange: { type: Function, required: false },
  src: { type: String, default: "" },
  border: { type: String, default: "5px solid black" },

  code: { type: String, default: "JME.class" },
  name: { type: String, default: "JME" + Math.random() },
  archive: { type: String, default: "JME.jar" },
  modelValue: { type: String, default: "" },
});
const emit = defineEmits(["change", "update:modelValue"]);

const src = ref(props.src || "./node_modules/jsme-editor/jsme.nocache.js");
console.log(src.value);
let jsmeIsLoaded = false;
const jsmeIsLoadedInternal = ref(false);

type JsmeEvent = {
  src: any;
};

// Include JSME-Editor core scripts.
// Beware, this script will add multiple scripts to the document.HEAD

const newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.src = src.value;
document.head.appendChild(newScript);

const updateValue = (inboundValue: Event) => {
  console.log(`Inbound: ${inboundValue}`);
  let value = "";
  if (!!inboundValue && inboundValue instanceof Event) {
    value = (inboundValue.target as HTMLInputElement).value;
  } else {
    value = inboundValue;
  }
  console.log(`Inbound->value: ${value}`);
  console.log(`props.modelValue: ${props.modelValue}`);

  emit("update:modelValue", value);
};

// Add jsmeOnLoad function. This is required for proper intialization of the applet
window.jsmeOnLoad = () => {
  jsmeIsLoaded = true;

  console.log("JSME-Editor module loaded");
  let JSA = new (window.JSApplet.JSME as unknown as JSME)(
    props.id,
    props.width,
    props.height,
    props.options
  );

  JSA.readGenericMolecularInput(props.modelValue);

  JSA.setCallBack("AfterStructureModified", (e: JsmeEvent) => {
    const newSmiles = e.src.smiles();
    updateValue(newSmiles);
    console.log(newSmiles);
    console.log(props.modelValue);
    if (props.onChange) {
      props.onChange(newSmiles);
    }
  });

  watch(
    () => props.modelValue,
    (newVal) => {
      console.log(`Watch props.modelValue: ${newVal}`);
      JSA.readGenericMolecularInput(newVal);
    }
  );
  jsmeIsLoadedInternal.value = true;
};
</script>
