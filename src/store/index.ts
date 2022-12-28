import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/Itarefa";
import INotificacao, { TipoNotificacao } from "@/interfaces/INotificacao";

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
    notificacoes: [
      {
        id: 1,
        text: 'Texto da notificação',
        titulo: 'Sucesso',
        tipo: TipoNotificacao.SUCESSO
      },
      {
        id: 2,
        text: 'Texto da notificação',
        titulo: 'Atençao',
        tipo: TipoNotificacao.ATENCAO
      },
      {
        id: 3,
        text: 'Texto da notificação',
        titulo: 'Falha',
        tipo: TipoNotificacao.FALHA
      }
    ]
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        name: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    }
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}