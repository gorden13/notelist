<template>
  <div class="todo-list__row">
    <div class="todo-list__row__header">
      <p v-if="!isNoteEdit" class="todo-list__row__title">
        {{ row.title }}
      </p>
      <input
        v-else
        v-model="title"
        type="text"
        class="form-control"
      >
      <!-- ОБычный режим -->
      <div v-if="!hasEdit" class="todo-list__row__action-buttons">
        <button title="открыть заметку" type="button" class="btn_sm" @click="openNote(row)">
          <font-awesome-icon :icon="['fa', 'external-link-alt']" />
        </button>
        <button title="удалить заметку" type="button" class="btn_sm" @click="removeNote(row.id)">
          <font-awesome-icon :icon="['fa', 'trash']" />
        </button>
      </div>
      <!-- Режим редактирования -->
      <div v-else v-show="!taskEditIsOn" class="todo-list__row__action-buttons">
        <button
          v-show="!isNoteEdit"
          title="редактировать заметку"
          type="button"
          @click="updateIsEditNote(!isNoteEdit)"
        >
          <font-awesome-icon :icon="['fa', 'edit']" />
        </button>
        <button v-show="!isNoteEdit" title="удалить заметку" type="button" class="btn_sm" @click="removeNote(row.id)">
          <font-awesome-icon :icon="['fa', 'trash']" />
        </button>
        <button v-show="isNoteEdit" title="завершить" type="button" class="btn_sm" @click="saveNote">
          <font-awesome-icon :icon="['fa', 'save']" />
        </button>
        <button v-show="isChange" title="вернуть изменения" type="button" class="btn_sm" @click="undoChanges({ title, tasks: note.tasks, id: note.id })">
          <font-awesome-icon :icon="['fa', 'undo']" />
        </button>
        <button v-show="isNoteEdit && isChange" title="отменить изменения" type="button" class="btn_sm" @click="closeNoteTitleEdit">
          <font-awesome-icon :icon="['fa', 'times']" />
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalView from '@/components/ModalWindow'

export default {
  props: {
    row: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    hasEdit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    editMode: false
  }),
  computed: {
    ...mapGetters({
      note: 'notes/note',
      isChange: 'notes/isNoteChange',
      editModeIsOn: 'notes/editModeIsOn',
      isNoteEdit: 'notes/isNoteEdit',
      getTaskEditIndex: 'notes/taskEditIndex',
      taskEditIsOn: 'notes/taskEditIsOn'
    }),
    title: {
      get () {
        return this.note.title
      },
      set (value) {
        this.updateNoteTitle(value)
      }
    }
  },
  methods: {
    ...mapActions({
      updateNoteTitle: 'notes/updateNoteTitle',
      remove: 'notes/remove',
      updateNote: 'notes/update',
      undoChanges: 'notes/emptyState',
      updateIsEditNote: 'notes/updateIsEditNote'
    }),
    openNote (note) {
      this.$router.push('/notes/' + note.id)
    },
    async saveNote () {
      if (!this.title) {
        this.$toasted.error('Необходимо ввести название заметки')
        return false
      }
      // закончили редактирование
      this.updateIsEditNote(false)
      if (!this.isChange) {
        return false
      }
      const updatedNote = {
        id: this.note.id,
        title: this.title,
        tasks: this.note.tasks
      }
      await this.updateNote(updatedNote)
    },
    closeNoteTitleEdit () {
      // закончили редактирование
      this.updateIsEditNote(false)
    },
    cancelChanges () {
      this.$modal.show(ModalView, {
        text: 'Вы действильно хотите отменить редактирование?',
        title: 'Редактирование записи',
        handlers: {
          confirm: () => {
            // закончили редактирование
            this.updateIsEditNote(false)
          }
        }
      }, {
        height: 'auto'
      })
    },
    removeNote (id) {
      this.$modal.show(ModalView, {
        text: 'Вы действильно хотите удалить запись?',
        title: 'Удаление записи',
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

<style lang="scss">
.todo-list {
  &__row {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin: 10px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    background-color: $bg-color-item;
    @media (max-width: $screen-phone-max-width) {
      width: auto;
      white-space: normal;
    }
    &__header {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__tasks-list {
      display: flex;
      flex-direction: column;
    }
    &__title {
      margin: 0;
      font-size: 20px;
      color: $main-title-color;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
