import {rootAppStateType} from "./redux-store";
import {createSelector} from "reselect";
import {UsersType} from "./store";

export const getAuth = (state: rootAppStateType) => {
    return state.auth.isAuth;
};

export const getUsers = (state: rootAppStateType) => {
    return state.usersPage.users
};

export const getUsersPageSize = (state: rootAppStateType) => {
    return state.usersPage.pageSize
};

export const getCurrentPage = (state: rootAppStateType) => {
    return state.usersPage.currentPage
};

export const getTotalUsersCount = (state: rootAppStateType) => {
    return state.usersPage.totalUsersCount
};

export const getIsFetching = (state: rootAppStateType) => {
    return state.usersPage.isFetching
};

export const getFollowingInProgress = (state: rootAppStateType) => {
    return state.usersPage.followingInProgress
};

export const getUserSelector = createSelector(getUsers, getAuth,(user, isAuth) => {
    return user.filter((u) => true)
})










/*
export const getUserSelector = (state: rootAppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector((users: rootAppStateType) => {
    return users.usersPage.
})

export const getPageSize = (state: rootAppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: rootAppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: rootAppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: rootAppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: rootAppStateType) => {
    return state.usersPage.followingInProgress
}*/
