export const getIsAuth = (state) => {
    return state.currentUser.isAuth;
}
export const getErrorMessage = (state) => {
    return state.currentUser.errorMessage;
}
export const getSuccessMessage = (state) => {
    return state.currentUser.successMessage;
}
export const getCurrentUser = (state) => {
    return state.currentUser;
}

export const getCurrentUserId = (state) => {
    return state.currentUser.userId;
}
