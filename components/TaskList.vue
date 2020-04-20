<template>
  <div class="task-list">
    <Task
      v-for="(task, index) in getTasks(noteId)"
      :key="index"
      :task-index="index"
      :note-id="noteId"
      :is-visible-edit-buttons="isVisibleEditButtons"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from '@/components/Task'
export default {
  components: {
    Task
  },
  props: {
    noteId: {
      type: Number,
      required: true
    },
    isVisibleEditButtons: {
      type: Boolean,
      required: false,
      default: false
    },
    getByNote: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      note: 'notes/note',
      notes: 'notes/notes'
    })
  },
  methods: {
    getTasks (noteId) {
      if (this.getByNote) {
        return this.note.tasks || []
      } else {
        const note = this.notes.find(item => item.id === noteId)
        if (note) {
          return note.tasks || []
        }
        return []
      }
    }
  }
}
</script>
