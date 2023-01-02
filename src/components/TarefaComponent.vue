<template>
  <BoxTemplate>
    <div class="columns clicavel" @click="tarefaClicada(tarefa)">
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
  emits: ['aoTarefaClicada'],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },
  methods: {
    tarefaClicada(tarefa: ITarefa): void {
      this.$emit("aoTarefaClicada", tarefa)
    }
  }
})
</script>

<style scoped>
.clicavel {
  cursor: pointer;

}
</style>
