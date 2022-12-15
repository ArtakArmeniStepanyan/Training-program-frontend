import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://server.am/',
})


export const addTodoApi = (data) => {
    return instance.post(`add-todo`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }});
}
export const getTodosApi = (id) => {
    return instance.get(`get-todos/` + id);
}
export const clearCompletedApi = (id) => {
    return instance.get(`clear-completed/` + id);
}
export const changeStatusApi = (userId, id, value) => {
    const data = {
        userId: userId,
        id: id,
        value: value
    }
    return instance.post(`change-todo-status`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }});
}
export const deleteTodoApi = (userId, id) => {
    const data = {
        userId: userId,
        id: id,
    }
    return instance.post(`delete-todo`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }});
}
