import style from '../style.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, deleteTodo } from '../../../../../Redux/Slices/TodoFull/todoFullReducer';
import { getCurrentUserId } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';


const DemoSortedTodoItem = ({todos, date}) => {

    const[viewMode, setViewMode] = useState(false);
    const datedTodos = todos.filter((t) => t.date === date);
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId)

    const onChange = (id, value) => {
        return dispatch(changeStatus(userId, id, value))
    }
    const onDelete = (id) => {
        return dispatch(deleteTodo(userId, id))
    }
    return(
        <div className={style.sortedTodoItem}>
            <div className={style.sortedItemDateAndButton}>
                <div className={style.dates}>
                    {date} ({todos.filter((t) => t.date === date).length})
                </div>
                <button className={style.showTodos}
                    onClick={() => {setViewMode(!viewMode)}}>{viewMode?'hide todos': 'show todos'}</button>
            </div>
            <div className={style.sortedItems}>
            {
                viewMode?
                    datedTodos.map((t) => {
                        return(
                            <div key={t.id} className={style.todoItemByDate}>
                                <label>
                                    <input className={style.checkbox} type='checkbox' checked={t.isCompleted} 
                                    onChange={(e) => {onChange(t.id, e.target.checked)
                                    }} />
                                    {t.todo}
                                    <button className={style.closeButton} onClick={(e) => {onDelete(t.id)}}>X</button>
                                </label>
                            </div>
                        )
                    })
                :''
            }
            </div>
        </div>
    )
}

export default DemoSortedTodoItem;