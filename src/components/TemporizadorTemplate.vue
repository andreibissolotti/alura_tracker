<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroFormatado :tempoEmSegundos='tempoEmSegundos' />
    <ButtonComponent :cronometroRodando="cronometroRodando" icon="fas fa-play" text="Iniciar" @click="iniciar" />
    <ButtonComponent :cronometroRodando="!cronometroRodando" icon="fas fa-stop" text="Parar" @click="finalizar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroFormatado from './CronometroFormatado.vue'
import ButtonComponent from './ButtonComponent.vue';

export default defineComponent({
  name: 'TemporizadorTemplate',
  emits: ['aoTemporizadorFinalizado'],
  components: {
    CronometroFormatado,
    ButtonComponent
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    }
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++
      }, 1000)
    },
    finalizar() {
      this.cronometroRodando = false
      clearInterval(this.cronometro)
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    }
  }
})
</script>