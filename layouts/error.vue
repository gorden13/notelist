<template>
  <section>
    <div class="container">
      <h1 v-if="error.statusCode === 404">
        Страница не найдена
      </h1>
      <h1 v-else>
        Произошла ошибка
      </h1>
      <p v-if="error.statusCode !== 404 && error.message">
        {{ error.message }}
      </p>
      <nuxt-link to="/">
        Главная страница
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    width: 600px;
    margin: 0 auto;
    padding-top: 5rem;
    .container {
      text-align: center;
      h1 {
        color: coral !important;
      }
      p {
        margin-bottom: 20px;
        font-weight: bold;
        color: #c33442;
      }
    }
  }
</style>
