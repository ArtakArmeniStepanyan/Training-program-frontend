import style from '../style.module.css'
import TodoDemoForm from './TodoDemoForm';
import TodoDemoList from './TodoDemoList';
import DemoTodoFooter from './DemoTodoFooter';

const TodoDemo = () => {
    return(
        <div className={style.App}>
            <h1>todos</h1>
            <div className={style.mainWindow}>
                <div className={style.mainApp}>
                <TodoDemoForm />
                <TodoDemoList />
                <DemoTodoFooter />  
                </div>
            </div>
        </div>
    )
}

export default TodoDemo;