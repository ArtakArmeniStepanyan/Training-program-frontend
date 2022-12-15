import style from '../style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDemoTodos } from '../../../../../Redux/Slices/TodoDemo/todoDemoSelector';
import { onClearCompletedAC } from '../../../../../Redux/Slices/TodoDemo/todoDemoReducer';



const DemoTodoFooter = () => {
    const todos = useSelector(getDemoTodos);
    const dispatch = useDispatch();
    const onClearCompleted = () => {
        return dispatch(onClearCompletedAC())
    }
    return(
        <div className={style.footer}>
            {todos.filter((t) => t.isCompleted).length}/{todos.length} completed
            <button onClick={onClearCompleted} className={style.clearButton}>clear complited</button>
        </div>
    )
}

export default DemoTodoFooter;