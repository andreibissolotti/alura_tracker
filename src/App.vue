<template>
  <main class="columns is-gapless is-multiline" :class="tema">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="mudarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxTemplate v-if="listaEstaVazia">
          Você não executou nenhuma tarefa ainda!!
        </BoxTemplate>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTarefa from './components/FormularioTarefa.vue';
import TarefaComponent from './components/TarefaComponent.vue';
import ITarefa from './interfaces/Itarefa';
import BoxTemplate from './components/BoxTemplate.vue';

export default defineComponent({
  name: "App",
  components: { BarraLateral, FormularioTarefa, TarefaComponent, BoxTemplate },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    },

    tema() {
      if (this.modoEscuroAtivo) {
        return 'modo-escuro'
      } else {
        return 'modo-claro'
      }
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },

    mudarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main.modo-claro {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
