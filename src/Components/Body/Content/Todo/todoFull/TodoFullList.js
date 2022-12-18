import { useState } from 'react';
import style from '../style.module.css';
import FullTodoItem from './FullTodoItem' ;
import FullSortedTodoItem from './FullSortedTodoItem' ;


const TodoDemoList = ({todos}) => {

    const[showDateMode, setShowDateMode] = useState(true)
    let dates = [];
    let exist;

    todos.map((t) => {
        dates.map((d) => {
            if(d === t.date)
                return exist = true;
            else
                return exist = false;
            })
            if(!exist)
                dates.push(t.date)
        })

    dates.sort();

     dates = Array.from(new Set(dates)) // WHY????????

    return(
        <div>
            <button className={style.showAllButton} 
                onClick={() => {setShowDateMode(!showDateMode)}}>{showDateMode?'show by date' : 'show all'}</button>
            <div>
                {
                    showDateMode?
                    todos.map((todo) => {
                        return(
                            <FullTodoItem 
                                key={todo.id} 
                                todo={todo} 
                            />
                        )
                    }):
                    dates.map((d)=> {
                        return(
                            <FullSortedTodoItem 
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