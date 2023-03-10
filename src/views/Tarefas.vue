<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <BoxTemplate v-if="listaEstaVazia">
      Você não executou nenhuma tarefa ainda!!
    </BoxTemplate>
    <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa" />
  </div>
  <modalComponent :ativo="tarefaSelecionada != null" v-if="tarefaSelecionada">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editar tarefa</p>
      <button class="delete" aria-label="close" @click="fecharModal"></button>
    </template>
    <template v-slot:corpo>
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
    </template>
    <template v-slot:rodape>
      <button class="button is-success" @click="alterarTarefa">Salvar</button>
      <button class="button" @click="fecharModal">Cancelar</button>
      <button class="button ml-2 is-danger" @click="deletarTarefa">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
      </button>
    </template>
  </modalComponent>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import modalComponent from '@/components/modalComponent.vue';
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
  components: { FormularioTarefa, TarefaComponent, BoxTemplate, modalComponent },
  setup() {
    const store = useStore(key)
    const idProjeto = ref('')
    const filtro = ref('')
    const tarefaSelecionada = ref(null as ITarefa | null)
    const { notificar } = useNotificador()
    const projetos = computed(() => store.state.projeto.projetos)
    const tarefas = computed(() => store.state.tarefa.tarefas?.filter(
      task => !filtro.value || task.descricao.toLowerCase().includes(filtro.value.toLowerCase())
    ))
    const listaEstaVazia = computed((): boolean => tarefas.value?.length === 0)

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
      filtro,
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
