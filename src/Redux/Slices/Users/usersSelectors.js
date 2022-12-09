export const getAllUsers = (state) => {
    return state.users.users;
}

export const getSelectedUser = (state) => {
    return state.users.selectedUser;
}

export const getIsFriendValue = (state) => {
    return state.users.isFriend;
}