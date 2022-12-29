import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, EXCLUIR_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/Itarefa";
import INotificacao from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, DELETAR_TAREFA, OBTER_TAREFAS } from "./tipo-actions";
import http from "@/http";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
  tarefas: ITarefa[],
  notificacoes: INotificacao[],
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: []
    },
    tarefas: [],
    notificacoes: []
  },
  mutations: {
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
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}