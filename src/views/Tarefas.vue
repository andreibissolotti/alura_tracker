<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxTemplate v-if="listaEstaVazia">
      Você não executou nenhuma tarefa ainda!!
    </BoxTemplate>
    <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa" />
  </div>
  <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição
          </label>
          <input class="input" type="text" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="alterarTarefa">Salvar</button>
        <button class="button" @click="fecharModal">Cancelar</button>
        <button class="button ml-2 is-danger" @click="deletarTarefa">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </footer>
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
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, DELETAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-actions';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: "TarefasView",
  components: { FormularioTarefa, TarefaComponent, BoxTemplate },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas?.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => this.notificar(TipoNotificacao.SUCESSO, 'Tarefa Registrada', `A tarefa foi registrada com sucesso`))
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(this.fecharModal)
    },
    deletarTarefa() {
      this.store.dispatch(DELETAR_TAREFA, this.tarefaSelecionada?.id)
        .then(this.fecharModal)
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
      tarefas: computed(() => store.state.tarefa.tarefas)
    }
  }
});
</script>
