import { createFolderApi } from '../../../Api/galleryApi';

let initialState = {
    folders: ['My images', 'Old images', 'abc'],
}


const galleryReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CREATE_FOLDER' : {
            return {
                ...state,
                folders: [...state.folders, action.payload]
            }
        }
        default:
            return state;
    }
}


//AC`s
export const createFolderAC = (folderName) => {
    return {type: 'CREATE_FOLDER', payload: folderName}
};

//thunks
export const createFolder = (userId, folderName) => {
    return async(dispatch, getState) => {
        return await createFolderApi(userId, folderName)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                // dispatch(setUsersAC(resp.data.users));
                console.log(resp.data)
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export default galleryReducer;

