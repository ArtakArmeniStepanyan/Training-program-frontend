import style from "../style.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo } from "../../../../../Redux/Slices/TodoFull/todoFullReducer";
import { getCurrentUserId } from "../../../../../Redux/Slices/CurrentUser/currentUserSelectors";

const TodoFullForm = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm({mode: "onBlur"});
    const onSubmit = (date) => {
        dispatch(addNewTodo(date));
        reset();
    };
    const userId = useSelector(getCurrentUserId)
    return (
        <div className={style.form}>    
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register ("text", {
                        required: true
                    })}
                    className={errors.text? `${style.newTodoInput} + ' ' + ${style.error}` : style.newTodoInput} 
                    placeholder='Write your todo here'
                     />
                <input 
                    {...register ("date", {
                        required: true
                    })}
                    type='date' 
                    className={errors.date? `${style.dateInput} + ' ' + ${style.error}` : style.dateInput}
                     />
                <input 
                    {...register ("userId", {
                    })}
                    type='hidden' 
                    value={userId}
                     />
                <button type="submit" className={style.addButton}>add</button>
            </form>
        </div>
    )
}

export default TodoFullForm;