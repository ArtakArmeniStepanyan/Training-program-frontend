import { 
        createFolderApi,
        getUserFoldersApi, 
        getCurrentFolderApi,
        getCurrentImagesApi, 
        deleteFolderApi,
        deleteImageApi,
        saveImageApi, 
    } from '../../../Api/galleryApi';

let initialState = {
    folders: [],
    currentFolder: {},
    currentImages: [],
    successMessage: '',
}


const galleryReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_FOLDERS' : {
            return {
                ...state,
                folders: action.payload
            }
        }
        case 'SET_CURRENT_FOLDER' : {
            return {
                ...state,
                currentFolder: action.payload
            }
        }
        case 'SET_CURRENT_IMAGES' : {
            return {
                ...state,
                currentImages: action.payload
            }
        }
        case 'SET_SUCCESS_MESSAGE' : {
            return {
                ...state,
                successMessage: action.payload
            }
        }
        default:
            return state;
    }
}


//AC`s
export const setFoldersAC = (folders) => {
    return {type: 'SET_FOLDERS', payload: folders}
};
export const setCurrentFolderAC = (folder) => {
    return {type: 'SET_CURRENT_FOLDER', payload: folder}
};
export const setCurrentImagesAC = (images) => {
    return {type: 'SET_CURRENT_IMAGES', payload: images}
};
export const setSuccessMessageAC = (message) => {
    return {type: 'SET_SUCCESS_MESSAGE', payload: message}
};

//thunks
export const createFolder = (userId, folderName) => {
    return async(dispatch, getState) => {
        return await createFolderApi(userId, folderName)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setFoldersAC(resp.data.folders));
                console.log(resp.data)
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const getUserFolders = (userId) => {
    return async(dispatch, getState) => {
        return await getUserFoldersApi(userId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setFoldersAC(resp.data.folders));
                // console.log(resp.data)
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const getCurrentFolder = (folderId) => {
    return async(dispatch, getState) => {
        return await getCurrentFolderApi(folderId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentFolderAC(resp.data.folder));
                // console.log(resp.data)
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const getCurrentImages = (folderId) => {
    return async(dispatch, getState) => {
        return await getCurrentImagesApi(folderId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentImagesAC(resp.data.images));
                // console.log(resp.data.images)
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const deleteFolder = (folderId) => {
    return async(dispatch, getState) => {
        return await deleteFolderApi(folderId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentFolderAC({}));
                dispatch(setSuccessMessageAC(resp.data.message));
                setTimeout(() => {
                    dispatch(setSuccessMessageAC(''))            
                }, '1500')           
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const deleteImage = (imageId) => {
    return async(dispatch, getState) => {
        return await deleteImageApi(imageId)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentImagesAC(resp.data.images));
                dispatch(setSuccessMessageAC(resp.data.message));
                setTimeout(() => {
                    dispatch(setSuccessMessageAC(''))            
                }, '1500')           
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}

export const saveImage = (date) => {
    const formData = new FormData();
        formData.append("folderId", date.folderId);
        formData.append("image", date.image[0]);
    return async(dispatch, getState) => {
        return await saveImageApi(formData)
        .then((resp) => {
            if(resp.data.status === 'ok'){
                dispatch(setCurrentImagesAC(resp.data.images));
                dispatch(setSuccessMessageAC(resp.data.message));
                setTimeout(() => {
                    dispatch(setSuccessMessageAC(''))            
                }, '1500') 
            }
            else{
                console.log(resp.data.message)
            }
        })
    }
}



export default galleryReducer;

