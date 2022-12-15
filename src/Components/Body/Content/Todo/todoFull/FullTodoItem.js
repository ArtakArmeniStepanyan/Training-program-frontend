import style from '../style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, deleteTodo } from '../../../../../Redux/Slices/TodoFull/todoFullReducer';
import { getCurrentUserId } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';

const DemoTodoItem = ({todo}) => {
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId)
    const onChange = (id, value) => {
        return dispatch(changeStatus(userId, id, value))
    }
    const onDelete = (id) => {
        return dispatch(deleteTodo(userId, id))
    }
    return(
        <div className={style.todoItem}>
            <label>
                <input type='checkbox' checked={todo.completed} className={style.checkbox} 
                onChange={(e) => {onChange(todo.id, e.target.checked)}} />
                {todo.todo}
                {`   `}({todo.date})
                <button className={style.closeButton} onClick={(e) => {onDelete(todo.id)}}>X</button>
            </label>
        </div>
    )
}

export default DemoTodoItem;