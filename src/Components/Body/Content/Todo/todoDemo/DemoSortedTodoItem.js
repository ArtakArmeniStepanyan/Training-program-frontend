import style from '../style.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onChangeAC, onDeleteAC } from '../../../../../Redux/Slices/TodoDemo/todoDemoReducer';


const DemoSortedTodoItem = ({todos, date}) => {

    const[viewMode, setViewMode] = useState(false);
    const datedTodos = todos.filter((t) => t.date === date);
    const dispatch = useDispatch();

    const onChange = (changedTodo) => {
        return dispatch(onChangeAC(changedTodo))
    }
    const onDelete = (deletedTodo) => {
        return dispatch(onDeleteAC(deletedTodo))
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
                                    onChange={(e) => {onChange({...t, isCompleted: e.target.checked})
                                    }} />
                                    {t.text}
                                    <button className={style.closeButton} onClick={(e) => {onDelete(t)}}>X</button>
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