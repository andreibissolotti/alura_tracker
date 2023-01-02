<template>
  <div class="modal" :class="{ 'is-active': ativo }" v-if="ativo">
    <div class="modal-background"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'modalComponent',
  props: {
    ativo: {
      type: Boolean,
      required: true
    }
  }
})
</script>