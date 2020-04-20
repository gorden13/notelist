<template>
  <button
    type="button"
    :class="$device.isMobile ? 'btn_btn-secondary' : ''"
  >
    <slot v-if="!$device.isMobile" />
    <template v-else>
      {{ btnText }}
    </template>
  </button>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style>

</style>
