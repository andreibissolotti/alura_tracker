<template>
  <section>
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
import { ALTERA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
  name: 'FormularioProjetos',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeDoProjeto = projeto?.name || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, { id: this.id, name: this.nomeDoProjeto })
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
      }
      this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', `O projeto ${this.nomeDoProjeto} foi salvo com sucesso`)
      this.nomeDoProjeto = ''
      this.$router.push('/projetos')
    }
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    }
  }
})
</script>