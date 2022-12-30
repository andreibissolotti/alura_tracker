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
        <div class="select">
          <select v-model="idProjeto">
            <option value="">N/D</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.name }}</option>
          </select>
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
import { computed, defineComponent, ref } from 'vue';
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
  setup() {
    const store = useStore(key)
    const idProjeto = ref('')
    const projetos = computed(() => store.state.projeto.projetos)
    const tarefas = computed(() => store.state.tarefa.tarefas)
    const listaEstaVazia = computed((): boolean => tarefas.value?.length === 0)
    const { notificar } = useNotificador()
    const tarefaSelecionada = ref(null as ITarefa | null)

    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const salvarTarefa = (tarefa: ITarefa) => {
      store.dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => notificar(TipoNotificacao.SUCESSO, 'Tarefa Registrada', `A tarefa foi registrada com sucesso`))
    }

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa
      idProjeto.value = tarefa.projeto?.id || ''
    }

    const fecharModal = () => {
      tarefaSelecionada.value = null
    }

    const alterarTarefa = () => {
      if (tarefaSelecionada.value) {
        tarefaSelecionada.value.projeto = projetos.value.find(proj => proj.id == idProjeto.value) || null
      }
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
        .then(fecharModal)
    }

    const deletarTarefa = () => {
      store.dispatch(DELETAR_TAREFA, tarefaSelecionada.value?.id)
        .then(fecharModal)
    }

    return {
      listaEstaVazia,
      tarefas,
      tarefaSelecionada,
      idProjeto,
      projetos,
      fecharModal,
      selecionarTarefa,
      salvarTarefa,
      alterarTarefa,
      deletarTarefa
    }
  }
});
</script>
