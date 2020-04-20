<template>
  <div>
    <CreateItem
      button-text="создать задачу"
      @createItem="createTask"
    />
    <TodoList>
      <ToDoRow :row="note" :has-edit="hasEdit">
        <TaskList
          :note-id="note.id"
          :is-visible-edit-buttons="hasEdit"
          :get-by-note="true"
        />
      </ToDoRow>
    </TodoList>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodoList from '@/components/TodoList'
import ToDoRow from '@/components/TodoRow'
import TaskList from '@/components/TaskList'
import CreateItem from '@/components/CreateItem'

export default {
  components: {
    TodoList,
    ToDoRow,
    TaskList,
    CreateItem
  },
  async fetch ({ store, params }) {
    await store.dispatch('notes/fetchSingle', params.id)
  },
  data: () => ({
    hasEdit: true
  }),
  computed: {
    ...mapGetters({
      note: 'notes/note'
    })
  },
  methods: {
    ...mapActions({
      create: 'notes/createTask'
    }),
    switchEditIndex (index) {
      this.taskEditIndex = index
    },
    async createTask (title) {
      if (!title) {
        this.$toasted.error('Необходимо ввести название задачи')
        return false
      }
      const task = {
        title,
        completed: false
      }
      await this.create(task)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
  &__row {
    flex: 1;
  }
}
</style>
