import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, DELETE_ALL_TODO, UPDATE_TODO, SET_FILTER } from './actionTypes';

export function addTodo(name) {
  return {
    type: ADD_TODO,
    payload: {
      name,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function deleteAllTodo(id) {
  return {
    type: DELETE_ALL_TODO,
  };
}

export function updateTodo(id, content) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      content
    }
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: {
      filter
    },
  };
}
