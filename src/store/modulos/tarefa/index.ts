import http from "@/http";
import ITarefa from "@/interfaces/Itarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, DELETAR_TAREFA } from "@/store/tipo-actions";
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA, DEFINIR_TAREFAS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
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
  }
}