import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://server.am/',
})

// export const createFolderApi = (userId, folderName) => {
//     return instance.get(`create-folder/` + folderName);
// }

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