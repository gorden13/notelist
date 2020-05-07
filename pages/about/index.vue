<template>
  <div class="about">
    <ul class="about__list">
      <li>в проекте использован стэк по nuxt.js</li>
      <li>nuxt-роутинг</li>
      <li>vuex</li>
      <li>json-server api</li>
      <li>vue-js-modal для диалогов и vue-toasted алертов</li>
						<li>mobile-detect для мобильной вёрстки</li>
      <li>автоделой при коммите в ветку мастер</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .about {
    padding: 10px;
    &__list {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      & > li {
        padding: 5px;
        margin: 3px;
        background: $bg-color-item;
        color: $main-title-color;
        border-radius: 5px;
      }
    }
  }
</style>
