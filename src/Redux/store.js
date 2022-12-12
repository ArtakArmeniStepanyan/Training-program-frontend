import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import currentUserReducer from "./Slices/CurrentUser/currentUserReducer";
import usersReducer from "./Slices/Users/usersReducer";
import weatherReducer from "./Slices/Weather/weatherReducer";


let reducers = combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    weather: weatherReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
