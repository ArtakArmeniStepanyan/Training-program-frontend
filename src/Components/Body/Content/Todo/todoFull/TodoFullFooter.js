import style from '../style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { clearCompleted } from '../../../../../Redux/Slices/TodoFull/todoFullReducer';



const DemoTodoFooter = ({todos}) => {
    const userId = useSelector(getCurrentUserId);
    const dispatch = useDispatch();
    const onClearCompleted = () => {
        return dispatch(clearCompleted(userId))
    }
    return(
        <div className={style.footer}>
            {todos.filter((t) => t.completed).length}/{todos.length} completed
            <button onClick={onClearCompleted} className={style.clearButton}>clear complited</button>
        </div>
    )
}

export default DemoTodoFooter;