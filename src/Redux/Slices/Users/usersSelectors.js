export const getAllUsers = (state) => {
    return state.users.users;
}

export const getAllFriends = (state) => {
    return state.users.friends;
}

export const getSelectedUser = (state) => {
    return state.users.selectedUser;
}

export const getIsFriendValue = (state) => {
    return state.users.isFriend;
}

export const getSuccessMessage = (state) => {
    return state.users.successMessage;
}