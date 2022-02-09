<template>
    <div class="componente">
        <h2>As Informações de Usuário</h2>
        <p>Vários detalhes...</p>
       <p>Alterar nome: <strong>{{ inverterNome() }}</strong></p>
        <p>Idade do Usuário: <strong>{{ idade }}</strong></p>
       <button @click="reiniciarNome">Reiniciar nome</button>
    </div>
</template>

<script>
export default {
   props: {
       nome: {
           type: String,
           //required: true,
           default: 'Anonimo'
       },
       idade: Number
   },
   methods: {
       inverterNome() {
           return this.nome.split('').reverse().join('')
       },
       reiniciarNome() {
           this.nome = 'Vinicius'
           this.$emit('mudarNome', this.nome)
       }
   }
}
</script>

<style scoped>
    .componente {
        flex: 1;
        background-color: #ec485f;
        color: #fff;
    }
</style>
