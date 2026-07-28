<script setup lang="ts">
const props = defineProps(["icon", "text"]);
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-0.25">
    <slot></slot>
    <span class="text-sm">{{ props.text }}</span>
  </div>
</template>
