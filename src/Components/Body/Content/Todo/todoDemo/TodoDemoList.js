import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getDemoTodos } from '../../../../../Redux/Slices/TodoDemo/todoDemoSelector';
import style from '../style.module.css';
import DemoTodoItem from './DemoTodoItem' ;
import DemoSortedTodoItem from './DemoSortedTodoItem' ;


const TodoDemoList = () => {
    const todos = useSelector(getDemoTodos);

    const[showDateMode, setShowDateMode] = useState(true)
    let dates = [];
    let exist;

    todos.map((t) => {
        dates.map((d) => {
            if(d == t.date)
                return exist = true;
            else
                return exist = false;

        })
        if(!exist){
            dates.push(t.date)
        }
    })

    dates.sort();

    return(
        <div>
            <button className={style.showAllButton} 
                onClick={() => {setShowDateMode(!showDateMode)}}>{showDateMode?'show by date' : 'show all'}</button>
            <div>
                {
                    showDateMode?
                    todos.map((todo) => {
                        return(
                            <DemoTodoItem 
                                key={todo.id} 
                                todo={todo} 
                            />
                        )
                    }):
                    dates.map((d)=> {
                        return(
                            <DemoSortedTodoItem 
                                key={d}
                                date={d}
                                todos={todos}
                            />           
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TodoDemoList;