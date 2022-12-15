import style from '../style.module.css';
import { useDispatch } from 'react-redux';
import { onChangeAC, onDeleteAC } from '../../../../../Redux/Slices/TodoDemo/todoDemoReducer';

const DemoTodoItem = ({todo}) => {
    const dispatch = useDispatch();
    const onChange = (changedTodo) => {
        return dispatch(onChangeAC(changedTodo))
    }
    const onDelete = (deletedTodo) => {
        return dispatch(onDeleteAC(deletedTodo))
    }
    return(
        <div className={style.todoItem}>
            <label>
                <input type='checkbox' checked={todo.isCompleted} className={style.checkbox} 
                onChange={(e) => {onChange({...todo, isCompleted: e.target.checked})}} />
                {todo.text}
                {`   `}({todo.date})
                <button className={style.closeButton} onClick={(e) => {onDelete(todo)}}>X</button>
            </label>
        </div>
    )
}

export default DemoTodoItem;