<template>
  <div class="create-block">
    <input v-model="newItem.title" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    <button
      :disabled="editModeIsOn"
      :title="getTitle"
      type="button"
      class="btn btn_primary"
      @click="createItem"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreateItem',
  props: {
    buttonText: {
      type: String,
      required: true
    }
  },
  data: () => ({
    newItem: {
      title: ''
    }
  }),
  computed: {
    ...mapGetters({
      editModeIsOn: 'notes/editModeIsOn'
    }),
    getTitle () {
      if (this.editModeIsOn) {
        return 'включен режим редактирования, кнопка заблокирована'
      }
      return ''
    }
  },
  methods: {
    createItem () {
      const title = this.newItem.title
      this.$emit('createItem', title)
      this.newItem.title = ''
    }
  }
}
</script>

<style scoped lang="scss">
.create-block {
  padding: 20px 20px;
  background-color: $bg-color;
  display: flex;
  justify-content: flex-start;
  button {
    padding: 10px;
    margin: 0 10px;
  }
  input {
    flex: 1;
    max-width: 500px;
  }
  @media (max-width: $screen-phone-max-width) {
    flex-direction: column;
    justify-content: space-between;
    height: 140px;
    button {
      margin: 0;
    }
    input {
      flex: 0;
    }
  }
}
</style>
