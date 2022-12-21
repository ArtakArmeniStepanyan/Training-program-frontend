export const getGalleryFolders = (state) => {
    return state.gallery.folders;
}
export const getCurrentFolderSelector = (state) => {
    return state.gallery.currentFolder;
}
export const getCurrentImagesSelector = (state) => {
    return state.gallery.currentImages;
}
export const getSuccessMessage = (state) => {
    return state.gallery.successMessage;
}