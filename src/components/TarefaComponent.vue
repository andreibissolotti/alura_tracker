<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao }}
      </div>
      <div class="column">
        <CronometroFormatado :tempo-em-segundos='tarefa.duracaoEmSegundos' />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/Itarefa';
import { defineComponent, PropType } from 'vue';
import CronometroFormatado from './CronometroFormatado.vue';

export default defineComponent({
  name: 'TarefaComponent',
  components: {
    CronometroFormatado
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
})
</script>

<style scoped>
.box {
  background: #FAF0CA;
}
</style>
