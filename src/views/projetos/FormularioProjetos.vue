<template>
  <section class="projetos">
    <H1 class="title">Projetos</H1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
        <input class="input" type="text" v-model="nomeDoProjeto" id="nomeDoProjeto" />
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'FormularioProjetos',
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  methods: {
    salvar() {
      this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
      this.nomeDoProjeto = ''
      this.$router.push('/projetos')
    }
  },
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>