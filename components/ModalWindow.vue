<template>
  <div class="modal-content">
    <h1 class="modal-content__title">
      {{ title }}
    </h1>
    <p class="modal-content__message">
      {{ text }}
    </p>
    <div class="modal-content__buttons">
      <button class="btn btn_primary" @click="confirm()">
        Да
      </button>
      <button class="btn btn_primary" @click="cancel()">
        Нет
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      reqiureq: true,
      default: ''
    },
    title: {
      type: String,
      reqiureq: true,
      default: ''
    },
    handlers: {
      type: Object,
      required: true,
      default () {
        return {
          confirm () {
            return false
          }
        }
      }
    }
  },
  methods: {
    confirm () {
      this.handlers.confirm()
      this.$emit('close')
    },
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    &__title {
      padding: 10px 0;
      color: $main-title-color;
    }
    &__message {
      padding: 10px;
      font-size: 20px;
      margin-bottom: 20px;
      color: $main-title-color;
    }
    &__buttons {
      display: flex;
      position: relative;
      width: 100%;
      bottom: 0;
      padding-bottom: 20px;
      justify-content: space-around;
    }
  }
</style>
