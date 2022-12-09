import { 
    loginApi, 
    getCurrentUserApi, 
    logoutApi, 
    registrationApi, 
    editProfileApi, 
    editPasswordApi,
    removeImageApi
 } from '../../../Api/currentUserApi';


let initialState = {
    userId: '',
    name: '',
    surname: '',
    email: '',
    image: '',
    isAuth: false,
    errorMessage: false,
    successMessage: false,
}

const currentUserReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER' : {
           return {
               ...state,
                isAuth: true,
                userId: action.payload.id,
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email,
                image: action.payload.image,   
           }
        }
        case 'SET_TOKEN' : {
            const strToken = JSON.stringify(action.payload);
            localStorage.setItem("token",strToken)
        }
        case 'REMOVE_CURRENT_USER' : {
            return {
                ...state,
                 isAuth: false,
                 userId: '',
                 name: '',
                 surname: '',
                 email: '',
                 image: '',   
                 errorMessage: false,  
                 successMessage: false,
            }
        }
        case 'SET_ERROR_MESSAGE' : {
            return {
                ...state,
                errorMessage: true,
            }
        }
        case 'SET_SUCCESS_MESSAGE' : {
            return {
                ...state,
                successMessage: action.payload,
            }
        }
        default:
            return state;
    }
}


//AC`s
export const setCurrentUserAC = (user) => {
    return {type: 'SET_CURRENT_USER', payload: user}
};

export const setTokenAC = (token) => {
    return {type: 'SET_TOKEN', payload: token}
};

export const removeCurrentUserAC = () => {
    return {type: 'REMOVE_CURRENT_USER'}
};

export const setErrorMessageAC = () => {
    return {type: 'SET_ERROR_MESSAGE'}
};
export const setSuccessMessageAC = (value) => {
    return {type: 'SET_SUCCESS_MESSAGE', payload: value}
};


//Thunks
export const login = (date) => {
    return async(dispatch, getState) => {
        return await loginApi(date)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setTokenAC(resp.data.token));
                dispatch(setCurrentUserAC(resp.data.user));
            }
            else{
                dispatch(setErrorMessageAC())
            }
        })
    }
}

export const registration = (date) => {

    const formData = new FormData();
        formData.append("name", date.name);
        formData.append("surname", date.surname);
        formData.append("email", date.email);
        formData.append("password", date.password);
        formData.append("image", date.image[0]);

    return async(dispatch, getState) => {
        return await registrationApi(formData)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setSuccessMessageAC(true))
            }
            else{
                // dispatch(setInvalidInputAC())
            }
        })
    }
}

export const editProfile = (date) => {

    const formData = new FormData();
        formData.append("userId", date.userId);
        formData.append("name", date.name);
        formData.append("surname", date.surname);
        formData.append("email", date.email);
        formData.append("image", date.image[0]);

    return async(dispatch, getState) => {
        return await editProfileApi(formData)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentUserAC(resp.data.user))
                dispatch(setSuccessMessageAC(true))
            }
            else{
                // dispatch(setInvalidInputAC())
            }
        })
    }
}

export const getCurrentUser = (token) => {
    return async(dispatch, getState) => {
        return await getCurrentUserApi(token)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentUserAC(resp.data.user));
            }   
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const logout = (id) => {
    return async(dispatch, getState) => {
        return await logoutApi(id)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(removeCurrentUserAC())
                localStorage.removeItem("token")
            }
            else{
                console.log('logout is not completed')
            }
        })
    }
}

export const editPassword = (date) => {
    return async(dispatch, getState) => {
        return await editPasswordApi(date)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setSuccessMessageAC(true))
            }
            else{
                dispatch(setErrorMessageAC())
            }
        })
    }
}

export const removeImage = (id) => {
    return async(dispatch, getState) => {
        return await removeImageApi(id)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentUserAC(resp.data.user))
                dispatch(setSuccessMessageAC(true))
            }
            else{
                
            }
        })
    }
}

export default currentUserReducer;

