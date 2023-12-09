import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: 
  state.todos.push(...action.payload);
      return {
        ...state
      };
    case CREATE_TODO:
      // console.log('before', state)
      // state.todos.push(action.payload);
      // console.log('after', state)
      return {
        ...state, 
        todos: [...state.todos, (action.payload)]
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id === action.type)
      }
    default:
      return state;
  }
}

export default reducer;