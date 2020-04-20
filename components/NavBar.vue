<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list-item">
        <nuxt-link no-prfetch active-class="active" exact class="navbar__list-item__link" to="/">
          Все заметки
        </nuxt-link>
      </li>
      <li class="navbar__list-item">
        <nuxt-link active-class="active" exact class="navbar__list-item__link" to="/about">
          О приложении
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss">
  .navbar {
    height: 50px;
    display: flex;
    align-items: center;
    background: #f7f6f6;
    &__list {
      display: flex;
      flex-direction: row;
      margin-left: 10px;
      &-item {
        padding: 10px;
        &__link {
          color: #757a80;
          text-decoration: none;
          &.active {
            color: $main-title-color;
          }
        }
      }
    }
  }
  </style>
