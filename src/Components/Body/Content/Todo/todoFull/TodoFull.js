import style from '../style.module.css'
import TodoFullForm from './TodoFullForm';
import TodoFullList from './TodoFullList';
import TodoFullFooter from './TodoFullFooter';
import { useSelector, useDispatch } from 'react-redux';
import { getFullTodos } from '../../../../../Redux/Slices/TodoFull/todoFullSelector';
import { useEffect } from 'react';
import { getTodos } from '../../../../../Redux/Slices/TodoFull/todoFullReducer';
import { getCurrentUserId } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';

const TodoFull = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId)

    useEffect(() => {
        dispatch(getTodos(userId));
    },[])
   
    const todos = useSelector(getFullTodos);

    return(
        <div className={style.App}>
            <h1>todos</h1>
            <div className={style.mainWindow}>
                <div className={style.mainApp}>
                <TodoFullForm />
                <TodoFullList todos={todos}/>
                <TodoFullFooter todos={todos}/>  
                </div>
            </div>
        </div>
    )
}

export default TodoFull;