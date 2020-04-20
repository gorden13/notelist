import Vue from 'vue'
export const state = () => ({
  notes: [],
  note: {},
  undoStates: [],
  isNoteChange: false,
  isNoteEdit: false,
  isTaskChange: false,
  taskEditIndex: -1
})

export const mutations = {
  emptyState (state, note) {
    if (state.undoStates.length) {
      // извлекаем последнее состояние
      state.note = JSON.parse(state.undoStates.pop())
      // заносим новое, при этом в массиве всегда только 1 состояние
      state.undoStates.push((JSON.stringify(note)))
      // Отменили всё -> изменений нет
      state.isNoteChange = false
    }
  },
  setNotes (state, notes) {
    state.notes = notes
  },
  setNote (state, note) {
    state.note = note
    state.undoStates.push((JSON.stringify(state.note)))
    // Сохранили заметку -> изменений нет
    state.isNoteChange = false
    state.isTaskChange = false
  },
  setNoteTitle (state, title) {
    state.note.title = title
    // изменили название заметки -> изменения есть
    state.isNoteChange = true
  },
  updateIsChangeNote (state, value) {
    state.isNoteChange = value
  },
  updateIsEditNote (state, value) {
    state.isNoteEdit = value
  },
  checkTask (state, { noteId, taskIndex }) {
    state.note.tasks[taskIndex].completed = !state.note.tasks[taskIndex].completed
    state.notes.forEach((item, index) => {
      if (item.id === noteId) {
        Vue.set(state.notes, index, state.note)
      }
    })
    this.dispatch('notes/update', state.note)
  },
  createTask (state, newTask) {
    state.note.tasks.push(newTask)
    this.dispatch('notes/update', state.note)
  },
  removeTask (state, taskId) {
    state.note.tasks.splice(taskId, 1)
    this.dispatch('notes/update', state.note)
  },
  updateTaskTitle (state, { title, taskIndex }) {
    state.note.tasks[taskIndex].title = title
    state.note.tasks = [...state.note.tasks]
    state.isTaskChange = true
  },
  createNote (state, note) {
    state.notes.push(note)
  },
  removeNote (state, id) {
    state.notes = state.notes.filter((item) => {
      return item.id !== id
    })
  },
  updateTaskEditIndex (state, index) {
    state.taskEditIndex = index
  }
}

export const actions = {
  async fetchAll ({ commit }) {
    const notes = await this.$axios.$get()
    commit('setNotes', notes)
  },
  async fetchSingle ({ commit }, id) {
    const note = await this.$axios.$get('/' + id)
    commit('setNote', note)
  },
  async create ({ commit }, note) {
    const result = await this.$axios.$post('', {
      title: note.title,
      tasks: note.tasks
    })
    commit('createNote', result)
  },
  async remove ({ commit }, id) {
    await this.$axios.$delete('/' + id)
    commit('removeNote', id)
  },
  async update ({ commit }, note) {
    await this.$axios.$put('/' + note.id, {
      title: note.title,
      tasks: note.tasks
    })
    commit('setNote', note)
  },
  updateNoteTitle ({ commit }, title) {
    commit('setNoteTitle', title)
  },
  emptyState ({ commit }, note) {
    commit('emptyState', note)
  },
  updateNote ({ commit }) {
    commit('setNote')
  },
  updateIsChangeNote ({ commit }, value) {
    commit('updateIsChangeNote', value)
  },
  updateIsEditNote ({ commit }, value) {
    commit('updateIsEditNote', value)
  },
  checkTask ({ commit }, { noteId, taskIndex }) {
    commit('checkTask', { noteId, taskIndex })
  },
  createTask ({ commit }, newTask) {
    commit('createTask', newTask)
  },
  removeTask ({ commit }, taskId) {
    commit('removeTask', taskId)
  },
  updateTaskTitle ({ commit }, { title, taskIndex }) {
    commit('updateTaskTitle', { title, taskIndex })
  },
  updateVisibleEditableButtons ({ commit }, value) {
    commit('updateVisibleEditableButtons', value)
  },
  updateTaskEditIndex ({ commit }, index) {
    commit('updateTaskEditIndex', index)
  }
}

export const getters = {
  notes: s => s.notes,
  note: s => s.note,
  isNoteChange: s => s.isNoteChange,
  isTaskChange: s => s.isTaskChange,
  isNoteEdit: s => s.isNoteEdit,
  taskEditIsOn: s => s.taskEditIndex !== -1,
  taskEditIndex: s => s.taskEditIndex,
  getTaskByIndex: s => (index, noteId) => {
    const note = s.notes.find(item => item.id === noteId)
    if (note) {
      return note.tasks[index]
    } else if (s.note) {
      return s.note.tasks[index]
    }
    return {}
  },
  getTaskListByNoteId: s => (noteId) => {
    const note = s.notes.find(item => item.id === noteId)
    if (note) {
      return note.tasks || []
    }
    return []
  },
  editModeIsOn: (s) => {
    // если редатируем таск или название заметки
    return s.taskEditIndex !== -1 || s.isNoteEdit
  }
}
