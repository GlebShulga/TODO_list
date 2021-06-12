import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const CHANGE_STATUS = 'CHANGE_STATUS'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TITLE = 'CHANGE_TITLE'
const DEL_TASK = 'DEL_TASK'

const initialState = {
  listOfTasks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
    case CHANGE_STATUS:
    case ADD_TASK:
    case CHANGE_TITLE:
    case DEL_TASK: {
      return { ...state, listOfTasks: action.listOfTasks }
    }
    default:
      return state
  }
}

export function getTasks() {
  return (dispatch) => {
    axios('/api/v1/tasks/').then(({ data }) => {
      dispatch({ type: GET_TASKS, listOfTasks: data })
    })
  }
}

export function changeStatus(id, status) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfTasks } = store.tasks

    const changedStatus = listOfTasks.map((item) =>
      item.taskId === id ? { ...item, status } : item
    )
    dispatch({ type: CHANGE_STATUS, listOfTasks: changedStatus })
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${id}`,
      data: {
        status
      }
    })
  }
}

export function addTask(title) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/v1/tasks',
      data: {
        title
      }
    }).then(({ data: listOfTasks }) => {
      dispatch({ type: ADD_TASK, listOfTasks })
    })
  }
}

export function changeTitle(id, title) {
  return (dispatch) => {
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${id}`,
      data: {
        title
      }
    }).then(({ data: listOfTasks }) => {
      dispatch({ type: CHANGE_TITLE, listOfTasks })
    })
  }
}

export function delTask(id) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/api/v1/tasks/${id}`
    }).then(({ data: listOfTasks }) => {
      dispatch({ type: DEL_TASK, listOfTasks })
    })
  }
}
