import {rootAppStateType} from "./redux-store";
import {createSelector} from "reselect";
import {UsersType} from "./store";


export const getUserSelector = (state: rootAppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUserSelector, (users:  Array<UsersType>) => {
    return users.filter(u => true)
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
}