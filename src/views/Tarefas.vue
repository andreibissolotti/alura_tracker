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
import { computed, defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import ITarefa from '../interfaces/Itarefa';
import BoxTemplate from '../components/BoxTemplate.vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import { OBTER_TAREFAS } from '@/store/tipo-actions';

export default defineComponent({
  name: "TarefasView",
  components: { FormularioTarefa, TarefaComponent, BoxTemplate },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.commit(ADICIONA_TAREFA, tarefa)
    }
  },
  setup() {
    const store = useStore(key)
    store.dispatch(OBTER_TAREFAS)
    return {
      store,
      tarefas: computed(() => store.state.tarefas)
    }
  }
});
</script>
