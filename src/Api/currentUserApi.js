import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://server.am/',
})


export const loginApi = (data) => {
    return instance.post(`login`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }}) ;
}

export const getCurrentUserApi = (token) => {
        return instance.get(`login/` + token);
    }

export const logoutApi = (id) => {
    return instance.delete(`login/` + id);
}

export const registrationApi = (data) => {
    return instance.post(`registration`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
    }}) ;
}

export const editProfileApi = (data) => {
    return instance.post(`edit-profile`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
    }}) ;
}
    
export const emailCheckApi = (value) => {
    return instance.get(`check-mail-origin/` + value).then((resp) => { 
        if(resp.data.status === 'ok') 
            return(true)
            else 
            return(false)
        })
}

export const emailCheckForRegisteredUserApi = (email, userId) => {
    return instance.post(`check-mail-origin`, JSON.stringify({email, userId}), {
        headers: {
            'Content-Type': 'application/json'
    }}).then((resp) => { 
        if(resp.data.status === 'ok') 
            return(true)
            else 
            return(false)
        })
}

export const editPasswordApi = (data) => {
    return instance.post(`edit-pass`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }}) ;
}

export const removeImageApi = (id) => {
    return instance.delete(`remove-image/` + id);
}
