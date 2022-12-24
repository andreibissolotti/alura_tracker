<template>
  <button class="button" @click="click" :disabled="cronometroRodando">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonComponent',
  emits: ['click'],
  props: {
    cronometroRodando: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    click(): void {
      this.$emit("click")
    }
  }
})
</script>