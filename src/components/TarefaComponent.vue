<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        Descrição Da tarefa
      </div>
      <div class="column">
        <CronometroFormatado :tempo-em-segundos=15 />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroFormatado from './CronometroFormatado.vue';

export default defineComponent({
  name: 'TarefaComponent',
  components: {
    CronometroFormatado
  }
})
</script>

<style scoped>
.box {
  background: #FAF0CA;
}
</style>
