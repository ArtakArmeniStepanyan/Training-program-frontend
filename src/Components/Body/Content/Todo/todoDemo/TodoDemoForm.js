import style from "../style.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewTodoAC } from "../../../../../Redux/Slices/TodoDemo/todoDemoReducer";

const TodoDemoForm = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm({mode: "onBlur"});
    const onSubmit = (date) => {
        dispatch(addNewTodoAC(date));
        reset();
    };

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
                <button type="submit" className={style.addButton}>add</button>
            </form>
        </div>
    )
}

export default TodoDemoForm;