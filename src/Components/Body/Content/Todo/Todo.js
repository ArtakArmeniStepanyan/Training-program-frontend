import TodoDemo from './todoDemo/TodoDemo';
import TodoFull from './todoFull/TodoFull';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../../../Redux/Slices/CurrentUser/currentUserSelectors';
const Todo = () => {
    const isAuth = useSelector(getIsAuth);

    return(
        <>
            {isAuth? <TodoFull /> : <TodoDemo />}
        </>        
    )
}

export default Todo;