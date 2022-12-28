<template>
  <BoxTemplate>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.name || "N/D" }}
      </div>
      <div class="column">
        <CronometroFormatado :tempo-em-segundos='tarefa.duracaoEmSegundos' class="no-dark" />
      </div>
    </div>
  </BoxTemplate>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/Itarefa';
import { defineComponent, PropType } from 'vue';
import CronometroFormatado from './CronometroFormatado.vue';
import BoxTemplate from './BoxTemplate.vue';

export default defineComponent({
  name: 'TarefaComponent',
  components: {
    CronometroFormatado,
    BoxTemplate
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
})
</script>
