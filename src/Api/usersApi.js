import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://server.am/',
})

export const getUsersApi = (id) => {
    if(id)
        return instance.get(`users/` + id);
    else
        return instance.get(`users`);
}

export const getUserApi = (id) => {
    return instance.get(`user/` + id);
}

export const addToFriendApi = (userId, friendId) => {
    const data = {
        userId: userId,
        friendId: friendId
    }
    return instance.post(`add-to-friend`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }});
}

export const getIsFriendApi = (userId, friendId) => {
    const data = {
        userId: userId,
        friendId: friendId
    }
    return instance.post(`is-friend`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }});
}

