import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import currentUserReducer from "./Slices/CurrentUser/currentUserReducer";
import usersReducer from "./Slices/Users/usersReducer";
import weatherReducer from "./Slices/Weather/weatherReducer";
import todoDemoReducer from "./Slices/TodoDemo/todoDemoReducer";
import todoFullReducer from "./Slices/TodoFull/todoFullReducer";
import galleryReducer from "./Slices/Gallery/galleryReducer";


let reducers = combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    weather: weatherReducer,
    todoDemo: todoDemoReducer,
    todoFull: todoFullReducer,
    gallery: galleryReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
