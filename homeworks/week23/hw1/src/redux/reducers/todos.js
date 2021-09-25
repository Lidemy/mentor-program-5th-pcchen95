import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, DELETE_ALL_TODO, UPDATE_TODO, SET_FILTER } from '../actionTypes';

let todoId = 0;
let todos = window.localStorage.getItem("todos") || "";
let todoData
let todoFilter
if (todos && JSON.parse(todos).todos.length > 0) {
  todoData = JSON.parse(todos).todos;
  todoId = todoData[0].id + 1;
  todoFilter = JSON.parse(todos).visibilityFilter
} else {
  todoData = [];
  todoFilter = 'all'
}
const initialState = {
  todos: todoData,
  visibilityFilter: todoFilter
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          {
            id: todoId++,
            name: action.payload.name,
            isCompleted: false,
          },
          ...state.todos,    
        ],
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return action.payload.id === todo.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo;
        }),
      };
    }

    case DELETE_ALL_TODO: {
      return {
        ...state,
        todos: [],
      };
    }

    case UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return action.payload.id === todo.id
            ? { ...todo, name: action.payload.content }
            : todo;
        }),
      }
    }

    case SET_FILTER: {
      return {
        ...state,
        visibilityFilter: action.payload.filter
      }
    }

    default: {
      return state;
    }
  }
}
