<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.name }}</option>
          </select>
        </div>
      </div>
      <div class="column">
        <TeomporizadorTemplate @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TeomporizadorTemplate from './TemporizadorTemplate.vue'
import { useStore } from 'vuex';
import { key } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { NOTIFICAR } from '@/store/tipo-mutacoes';

export default defineComponent({
  name: 'FormularioTarefa',
  components: {
    TeomporizadorTemplate
  },
  emits: ['aoSalvarTarefa'],
  data() {
    return {
      descricao: '',
      idProjeto: '',
      tempoDecorrido: 0
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      if (this.idProjeto) {
        this.$emit('aoSalvarTarefa', {
          duracaoEmSegundos: tempoDecorrido || this.tempoDecorrido,
          descricao: this.descricao,
          projeto: this.projetos.find(proj => proj.id == this.idProjeto)
        })
        this.descricao = ''
      } else {
        this.store.commit(NOTIFICAR, {
          titulo: 'ERRO!!',
          texto: 'É nescessario vincular a tarefa à um projeto',
          tipo: TipoNotificacao.FALHA
        })
      }
    }
  },
  setup() {
    const store = useStore(key)
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  }
})
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(---bg-primario);
}
</style>
