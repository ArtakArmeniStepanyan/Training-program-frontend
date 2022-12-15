

const initialState = [
    {
      id: 1,
      text: 'Learn React',
      date: '2022-10-15',
      isCompleted: true
    },
    {
      id: 2,
      text: 'Go to the interview',
      date: '2022-10-15',
      isCompleted: false
    },
    {
      id: 3,
      text: 'Get a job',
      date: '2022-10-16',
      isCompleted: false
    },
];

const todoDemoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD': 
          return[
            ...state,
          {
            id: state.length + 3,
            text: action.payload.text,
            date: action.payload.date,
            isCompleted: false 
          }
        ]
        case 'CHANGE_STATUS':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return action.payload;
              }
                return s;
            })
        case 'DELETE':
          return state.filter((s) => s.id !== action.payload.id) 
        case 'CLEAR_COMPLETED':
          return state.filter((s) => !s.isCompleted)
    
        default: return state;
      }
}


//AC`s
export const addNewTodoAC = (newTodo) => {
    return {type: 'ADD', payload: newTodo}
  };

export const onChangeAC = (todo) => {
    return{type: 'CHANGE_STATUS', payload: todo}
  };

export const onDeleteAC = (todo) => {
    return{type: 'DELETE', payload: todo}
  };

export const onClearCompletedAC = () => {
    return{type: 'CLEAR_COMPLETED'}  
  };


export default todoDemoReducer;
