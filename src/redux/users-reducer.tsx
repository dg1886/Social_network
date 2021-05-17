import {followingInProgressType, StateActionsTypes, UsersPageType, UsersType} from "./store";
import {APIResponseType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helper";

export type UsersActionsTypes =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof setToggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>


export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT_PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
export const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
export const TOGGLE_IN_FOLLOWING_PROGRESS = 'TOGGLE-IN-FOLLOWING-PROGRESS';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<followingInProgressType>,
}

type InitialStateType = typeof initialState

const usersReducer = (state: InitialStateType = initialState, action: StateActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                    /*state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })*/
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                    /*state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })*/
            }

        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IN_FOLLOWING_PROGRESS: {
            const followingInProgressObject = {isFetching: action.isFetching, userId: action.userId}
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, followingInProgressObject]
                    : state.followingInProgress.filter(el => el.userId !== action.userId)
            }
        }

        default:
            return state
    }
}
export const followSuccess = (userId: number) => ({type: FOLLOW, userId}) as const

export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId}) as const

export const setUsers = (users: Array<UsersType>) => ({type: SET_USERS, users}) as const

export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const

export const setUsersTotalCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
}) as const

export const setToggleIsFetching = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
}) as const

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IN_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId
}) as const




const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: (userId:number)=>UsersActionsTypes) => {
    dispatch(toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    if(response.resultCode === 0) {dispatch(actionCreator(userId))}
    dispatch(toggleFollowingProgress(false, userId))
}

// thunk
export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(setToggleIsFetching(true))
        dispatch(setCurrentPage(page))
       let data = await usersAPI.getUsers(page, pageSize)
            dispatch(setToggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setUsersTotalCount(data.totalCount))
    }
}
export const follow = (userId: number) => {
    return async(dispatch: Dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator = followSuccess
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = unfollowSuccess
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

    }
}
/*export const follow = (userId: number) => {

    return async (dispatch: Dispatch) => {
        debugger
        dispatch(toggleFollowingProgress(true, userId))
        let response = await usersAPI.follow(userId)
                if(response.resultCode === 0) {dispatch(followSuccess(userId))}
                dispatch(toggleFollowingProgress(false, userId))
    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        debugger
        dispatch(toggleFollowingProgress(false, userId))
        let response = await usersAPI.unfollow(userId)
        if(response.data === 0) {
            debugger
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))

    }
}*/



export default usersReducer