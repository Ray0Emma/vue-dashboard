<template>
    <div :class="$attrs.class" class="relative sm:col-span-3">
      <label
        v-if="label"
        class="form-label text-black dark:text-gray-300 text-sm font-medium"
        :for="id"
        >{{ label }}:</label
      >
      <select
        :id="id"
        ref="input"
        v-model="selected"
        v-bind="{ ...$attrs, class: null }"
        class="form-select w-full text-sm px-3 py-2.5 mt-1 rounded-lg border text-black dark:text-gray-300 dark:bg-gray-900 bg-white disabled:bg-gray-200 focus:outline-none focus:ring-transparent focus:border-violet-700"
        :class="{ error: error }"
      >
        <slot />
      </select>
      <div v-if="error" class="form-error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import { v4 as uuid } from "uuid";
  export default {
    inheritAttrs: false,
    props: {
      id: {
        type: String,
        default() {
          return `select-input-${uuid()}`;
        },
      },
      error: String,
      label: String,
      modelValue: [String, Number, Boolean],
    },
    emits: ["update:modelValue"],
    data() {
      return {
        selected: this.modelValue,
      };
    },
    watch: {
      selected(selected) {
        this.$emit("update:modelValue", selected);
        // console.log(selected);
      },
    },
    methods: {
      focus() {
        this.$refs.input.focus();
      },
      select() {
        this.$refs.input.select();
      },
    },
  };
  </script>