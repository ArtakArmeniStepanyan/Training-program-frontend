import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://server.am/',
})

export const getUserFoldersApi = (userId) => {
    return instance.get(`get-folders/` + userId);
}

export const getCurrentFolderApi = (folderId) => {
    return instance.get(`get-current-folder/` + folderId);
}

export const getCurrentImagesApi = (folderId) => {
    return instance.get(`get-current-images/` + folderId);
}

export const deleteFolderApi = (folderId) => {
    return instance.get(`delete-folder/` + folderId);
}

export const deleteImageApi = (imageId) => {
    return instance.get(`delete-image/` + imageId);
}

export const createFolderApi = (userId, folderName) => {
    const data = {
        userId: userId,
        folderName: folderName,
    }
    return instance.post(`create-folder`,  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
    }});
}

export const saveImageApi = (data) => {
    return instance.post(`save-image`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
    }}) ;
}

