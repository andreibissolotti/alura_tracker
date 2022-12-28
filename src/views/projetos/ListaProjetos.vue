<template>
  <section class="lista">
    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </RouterLink>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.name }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}/edit`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacoes';
import { RouterLink } from 'vue-router';
import { OBTER_PROJETOS } from '@/store/tipo-actions';

export default defineComponent({
  name: 'ListaProjetos',
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  },
  methods: {
    excluir(id: string) {
      this.store.commit(EXCLUIR_PROJETO, id)
    }
  }
})
</script>

<style>
.table,
.table thead td,
.table thead th {
  color: var(--texto-primario);
  background-color: var(---bg-primario);
}

.title {
  color: var(--texto-primario);
}
</style>