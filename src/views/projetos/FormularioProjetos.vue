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
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-actions';

export default defineComponent({
  name: 'FormularioProjetos',
  props: {
    id: {
      type: String
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(ALTERAR_PROJETO, { id: this.id, name: this.nomeDoProjeto })
          .then(() => this.sucesso())
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.sucesso())
      }
    },
    sucesso() {
      this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', `O projeto ${this.nomeDoProjeto} foi salvo com sucesso`)
      this.nomeDoProjeto = ''
      this.$router.push('/projetos')
    }
  },
  setup(props) {
    const store = useStore()
    const { notificar } = useNotificador()

    const nomeDoProjeto = ref('')

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.name || ''
    }

    return {
      store,
      notificar,
      nomeDoProjeto
    }
  }
})
</script>

<style scoped>
.label {
  color: var(--texto-primario);
}
</style>