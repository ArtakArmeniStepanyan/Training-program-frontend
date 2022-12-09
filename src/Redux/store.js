import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import currentUserReducer from "./Slices/CurrentUser/currentUserReducer";
import usersReducer from "./Slices/Users/usersReducer";


let reducers = combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
