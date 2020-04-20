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
        <action-button
          title="открыть заметку"
          :btn-text="'открыть'"
          @click.native="openNote(row)"
        >
          <font-awesome-icon :icon="['fa', 'external-link-alt']" />
        </action-button>
        <action-button
          title="удалить заметку"
          :btn-text="'удалить'"
          @click.native="removeNote(row.id)"
        >
          <font-awesome-icon :icon="['fa', 'trash']" />
        </action-button>
      </div>
      <!-- Режим редактирования -->
      <div v-else v-show="!taskEditIsOn" class="todo-list__row__action-buttons">
        <action-button
          v-show="!isNoteEdit"
          title="редактировать заметку"
          :btn-text="'редактировать'"
          @click.native="updateIsEditNote(!isNoteEdit)"
        >
          <font-awesome-icon :icon="['fa', 'edit']" />
        </action-button>
        <action-button
          v-show="!isNoteEdit"
          title="удалить заметку"
          :btn-text="'удалить'"
          @click.native="removeNote(row.id)"
        >
          <font-awesome-icon :icon="['fa', 'trash']" />
        </action-button>
        <action-button
          v-show="isNoteEdit"
          title="завершить"
          :btn-text="'завершить'"
          @click.native="saveNote"
        >
          <font-awesome-icon :icon="['fa', 'save']" />
        </action-button>
        <action-button
          v-show="isChange"
          title="вернуть изменения"
          :btn-text="'вернуть'"
          @click.native="undoChanges({ title, tasks: note.tasks, id: note.id })"
        >
          <font-awesome-icon :icon="['fa', 'undo']" />
        </action-button>
        <action-button
          v-show="isNoteEdit && isChange"
          title="отменить изменения"
          :btn-text="'отменить'"
          @click.native="closeNoteTitleEdit"
        >
          <font-awesome-icon :icon="['fa', 'times']" />
        </action-button>
      </div>
    </div>
    <slot />
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
      @media (max-width: $screen-phone-max-width) {
        align-items: stretch;
        flex-direction: column;
      }
    }
    &__action-buttons {
       @media (max-width: $screen-phone-max-width) {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
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
