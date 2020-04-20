<template>
  <div class="todo-list">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.todo-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;;
  align-items: stretch;
  @media (max-width: $screen-phone-max-width) {
    flex-direction: column;
  }
}

</style>
