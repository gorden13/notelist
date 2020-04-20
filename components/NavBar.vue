<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <nuxt-link exact no-prfetch class="nav-link" to="/">Главная</nuxt-link> -->
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link no-prfetch active-class="active" exact class="nav-link" to="/">
            Все заметки
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" exact class="nav-link" to="/about">
            О приложении
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
