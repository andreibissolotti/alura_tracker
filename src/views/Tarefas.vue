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
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-actions';
import { TipoNotificacao } from '@/interfaces/INotificacao';

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
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => this.notificar(TipoNotificacao.SUCESSO, 'Tarefa Registrada', `A tarefa foi registrada com sucesso`))
    }
  },
  setup() {
    const store = useStore(key)
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    const { notificar } = useNotificador()
    return {
      store,
      notificar,
      tarefas: computed(() => store.state.tarefas)
    }
  }
});
</script>
