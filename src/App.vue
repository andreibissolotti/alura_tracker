<template>
  <main class="columns is-gapless is-multiline" :class="tema">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="mudarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacoesComponent />
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesComponent from './components/NotificacoesComponent.vue';

export default defineComponent({
  name: "App",
  components: { BarraLateral, NotificacoesComponent },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    tema() {
      if (this.modoEscuroAtivo) {
        return 'modo-escuro'
      } else {
        return 'modo-claro'
      }
    }
  },
  methods: {
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
