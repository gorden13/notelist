<template>
  <div>
    <CreateItem button-text="создать заметку" @createItem="createNote" />
    <TodoList>
      <ToDoRow
        v-for="(row, id) in notes"
        :key="id"
        :row="row"
      >
        <TaskList
          :note-id="row.id"
          :get-by-note="false"
        />
      </ToDoRow>
    </TodoList>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import CreateItem from '@/components/CreateItem'
import TodoList from '@/components/TodoList'
import ToDoRow from '@/components/TodoRow'
import TaskList from '@/components/TaskList'

export default {
  components: {
    CreateItem,
    TodoList,
    ToDoRow,
    TaskList
  },
  async fetch ({ store }) {
    await store.dispatch('notes/fetchAll')
  },
  computed: {
    ...mapGetters({
      notes: 'notes/notes'
    })
  },
  methods: {
    ...mapActions({
      create: 'notes/create'
    }),
    async createNote (title) {
      if (!title) {
        this.$toasted.error('Необходимо ввести название заметки')
        return false
      }
      const newNote = {
        title,
        tasks: []
      }
      await this.create(newNote)
    }
  }
}
</script>
