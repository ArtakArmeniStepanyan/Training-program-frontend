import{ getUsersApi, getUserApi, addToFriendApi, getIsFriendApi } from '../../../Api/usersApi'
let initialState = {
    users: [],
    friends: [],
    selectedUser: {},
    isFriend: false,
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USERS' : {
            return {
                ...state,
                users: action.payload,
            }
        }
        case 'SET_SELECTED_USER' : {
            return{
                ...state,
                selectedUser: {...state.selectedUser, 
                    userId: action.payload.id,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    email: action.payload.email,
                    image: action.payload.image,
                    }
                }
            }
        case 'SET_IS_FRIEND' : {
            return{
                ...state,
                isFriend: action.payload
            }
        }
        default:
            return state;
    }
}


//AC`s
export const setUsersAC = (users) => {
    return {type: 'SET_USERS', payload: users}
};
export const setSelectedUserAC = (user) => {
    return {type: 'SET_SELECTED_USER', payload: user}
};
export const setIsFriendAC = (value) => {
    return {type: 'SET_IS_FRIEND', payload: value}
};


//thunks
export const getUsers = (exceptId) => {
    return async(dispatch, getState) => {
        return await getUsersApi(exceptId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setUsersAC(resp.data.users));
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const getUser = (id) => {
    return async(dispatch, getState) => {
        return await getUserApi(id)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setSelectedUserAC(resp.data.user));
            }   
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const addToFriend = (userId, friendId) => {
    return async(dispatch, getState) => {
        return await addToFriendApi(userId, friendId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                // dispatch(setSelectedUserAC(resp.data.user));
                alert('friend added');
            }   
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const getIsFriend = (userId, friendId) => {
        return async(dispatch, getState) => {
            if(userId){
            return await getIsFriendApi(userId, friendId)
            .then((resp) => {
                if(resp.data.status === 'ok'){
                    dispatch(setIsFriendAC(resp.data.isFriend));
                }   
                else{
                    console.log(resp.data.message)
                }
            })
        }
        else
        console.log('you are not logged in')
    }
}

export default usersReducer;
