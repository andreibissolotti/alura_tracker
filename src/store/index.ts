import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/Itarefa";
import INotificacao from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, DELETAR_PROJETO, DELETAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from "./tipo-actions";
import http from "@/http";

interface Estado {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: []
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        name: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(task => task.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [EXCLUIR_TAREFA](state, id: number) {
      state.tarefas = state.tarefas.filter(task => task.id != id)
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(noti => noti.id != novaNotificacao.id)
      }, 3000)
    }
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('projetos')
        .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        name: nomeDoProjeto
      })
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.patch(`/projetos/${projeto.id}`, projeto)
    },
    [DELETAR_PROJETO]({ commit }, id: string) {
      return http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id))
    },
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas')
        .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.patch(`/tarefas/${tarefa.id}`, tarefa)
        .then(resposta => commit(ALTERA_TAREFA, resposta.data))
    },
    [DELETAR_TAREFA]({ commit }, id: string) {
      return http.delete(`/tarefas/${id}`)
        .then(() => commit(EXCLUIR_TAREFA, id))
    },
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}