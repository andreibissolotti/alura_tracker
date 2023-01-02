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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormularioProjetos',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const { notificar } = useNotificador()

    const nomeDoProjeto = ref('')

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.name || ''
    }

    const sucesso = () => {
      notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', `O projeto ${nomeDoProjeto.value} foi salvo com sucesso`)
      nomeDoProjeto.value = ''
      router.push('/projetos')
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, { id: props.id, name: nomeDoProjeto.value })
          .then(() => sucesso())
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => sucesso())
      }
    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
})
</script>

<style scoped>
.label {
  color: var(--texto-primario);
}
</style>
