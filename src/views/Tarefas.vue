<template>
  <div class="column is-three-quarter conteudo">
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
      <BoxTemplate v-if="listaEstaVazia">
        Você não executou nenhuma tarefa ainda!!
      </BoxTemplate>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import ITarefa from '../interfaces/Itarefa';
import BoxTemplate from '../components/BoxTemplate.vue';

export default defineComponent({
  name: "TarefasView",
  components: { FormularioTarefa, TarefaComponent, BoxTemplate },
  data() {
    return {
      tarefas: [] as ITarefa[],
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  }
});
</script>
