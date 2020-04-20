<template>
  <div class="task">
    <div class="task__body">
      <label
        v-show="isVisibleEditButtons && getTaskEditIndex === -1 && !isNoteEdit"
        class="task__body_checkbox"
        @click="checkTask({ noteId: noteId, taskIndex: taskIndex })"
      >
        <font-awesome-icon v-if="task.completed" :icon="['fa', 'check']" class="task__body_checkbox-fa-check" />
      </label>
      <p
        v-show="getTaskEditIndex !== taskIndex"
        class="task__body_title"
        :class="{ 'task__body_title--completed': task.completed }"
      >
        {{ task.title }}
      </p>
      <input
        v-if="getTaskEditIndex === taskIndex"
        v-model="title"
        class="task__body_input"
        type="text"
      >
    </div>
    <div v-if="isVisibleEditButtons" v-show="!isNoteEdit" class="task__buttons">
      <action-button
        v-if="getTaskEditIndex === -1 && !isNoteEdit"
        type="button"
        class="btn"
        title="редактировать задачу"
        :btn-text="'редактировать'"
        @click.native="taskEditIndex = taskIndex"
      >
        <font-awesome-icon :icon="['fa', 'edit']" />
      </action-button>
      <action-button
        v-if="getTaskEditIndex === taskIndex"
        class="btn"
        title="завершить"
        :btn-text="'завершить'"
        @click.native="saveTask"
      >
        <font-awesome-icon :icon="['fa', 'save']" />
      </action-button>
      <action-button
        v-if="getTaskEditIndex === -1 && !isNoteEdit"
        class="btn"
        title="удалить задачу"
        :btn-text="'удалить'"
        @click.native="removeTask(taskIndex)"
      >
        <font-awesome-icon :icon="['fa', 'trash']" />
      </action-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalView from '@/components/ModalWindow'
import actionButton from '@/components/action-button'
export default {
  components: {
    actionButton
  },
  props: {
    taskIndex: {
      type: Number,
      required: true
    },
    isVisibleEditButtons: {
      type: Boolean,
      required: false,
      default: false
    },
    noteId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getTask: 'notes/getTaskByIndex',
      isNoteEdit: 'notes/isNoteEdit',
      note: 'notes/note',
      getTaskEditIndex: 'notes/taskEditIndex'
    }),
    task: {
      get () {
        return this.getTask(this.taskIndex, this.noteId)
      }
    },
    title: {
      get () {
        return this.getTask(this.taskIndex, this.noteId).title
      },
      set (value) {
        this.updateTaskTitle({ title: value, taskIndex: this.taskIndex })
      }
    },
    taskEditIndex: {
      get () {
        return this.getTaskEditIndex
      },
      set (index) {
        this.setTaskEditIndex(index)
      }
    }
  },
  methods: {
    ...mapActions({
      updateTaskTitle: 'notes/updateTaskTitle',
      updateIsEditNote: 'notes/updateIsEditNote',
      updateNote: 'notes/update',
      remove: 'notes/removeTask',
      setTaskEditIndex: 'notes/updateTaskEditIndex',
      checkTask: 'notes/checkTask'
    }),
    saveTask () {
      this.updateIsEditNote(false)
      this.setTaskEditIndex(-1)
      if (this.isTaskChange) {
        this.updateNote(this.note)
      }
    },
    removeTask (id) {
      this.$modal.show(ModalView, {
        text: 'Вы действильно хотите удалить задачу?',
        title: 'Удаление задачи',
        handlers: {
          confirm: () => {
            this.remove(id)
          }
        }
      }, {
        height: 'auto'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.task {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  border-top: 1px solid #e4e4e4;
  @media (max-width: $screen-phone-max-width) {
    flex-direction: column;
  }
  &__body {
    display: flex;
    align-items: center;
    width: 500px;
    @media (max-width: $screen-phone-max-width) {
      width: 100%;
    }
    &_title {
      margin: 0;
      font-size: 16px;
      &--completed {
        text-decoration: line-through;
      }
    }
    &_input {
      width: 100%;
    }
    &_checkbox {
      margin-right: 10px;
      border: 1px solid $divider-color;
      background: $main-bg-btn-color;
      cursor: pointer;
      border-radius: 5px;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-fa-check {
        color: $pr-btn-bg-color;
        font-size: 16px;
      }
    }
  }
  &__buttons {
      @media (max-width: $screen-phone-max-width) {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 20px 0;;
    }
  }
  &:hover {
    background-color: #bdd9c1;
    cursor: default;
  }
}
</style>
