import { addTodoApi, getTodosApi, clearCompletedApi, changeStatusApi, deleteTodoApi } from '../../../Api/todosApi';

const initialState = {
  todos: [],
};

const todoFullReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_TODOS' : {
      return {
          ...state,
          todos: action.payload,
      }
    }
    default: return state;
  }
}



//AC`s
export const setTodosAC = (todos) => {
  return {type: 'SET_TODOS', payload: todos}
};


//thunks
export const getTodos = (userId) => {
  return async(dispatch, getState) => {
      return await getTodosApi(userId)
      .then((resp) => {
          if(resp.data.status === 'ok'){
              dispatch(setTodosAC(resp.data.todos));
          }
          else{
              console.log(resp.data.message)
          }
      })
  }
}

export const addNewTodo = (userId) => {
  return async(dispatch, getState) => {
      return await addTodoApi(userId)
      .then((resp) => {
          if(resp.data.status === 'ok'){
              dispatch(setTodosAC(resp.data.todos));
          }
          else{
              console.log(resp.data.message)
          }
      })
  }
}

export const clearCompleted = (userId) => {
  return async(dispatch, getState) => {
      return await clearCompletedApi(userId)
      .then((resp) => {
          if(resp.data.status === 'ok'){
              dispatch(setTodosAC(resp.data.todos));
          }
          else{
              console.log(resp.data.message)
          }
      })
  }
}

export const changeStatus = (userId, id, value) => {
  return async(dispatch, getState) => {
      return await changeStatusApi(userId, id, value)
      .then((resp) => {
          if(resp.data.status === 'ok'){
              dispatch(setTodosAC(resp.data.todos));
          }
          else{
              console.log(resp.data.message)
          }
      })
  }
}

export const deleteTodo = (userId, id) => {
  return async(dispatch, getState) => {
      return await deleteTodoApi(userId, id)
      .then((resp) => {
          if(resp.data.status === 'ok'){
              dispatch(setTodosAC(resp.data.todos));
          }
          else{
              console.log(resp.data.message)
          }
      })
  }
}


export default todoFullReducer;
