import {PostType, StateActionsTypes} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

type PhotosType = {
    small: string
    large: string
}
type UsersContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: string  //number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: Array<UsersContactsType>
    photos: PhotosType
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: Array<ProfileType> | null
    status: string
}

export type ProfileActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfileActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof setStatusActionCreator>


export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';
export const SET_STATUS = 'SET-STATUS';

let initialState = {
    posts: [
        {id: Date.now().toString(), message: 'hello', likesCount: 1},
        {id: Date.now().toString(), message: 'i', likesCount: 0},
        {id: Date.now().toString(), message: 'lol', likesCount: 0}
    ],
    newPostText: '',
    profile: null,
    status: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: StateActionsTypes): ProfilePageType => {

    switch (action.type) {

        case ADD_POST: {
            let newPost: PostType = {
                id: Date.now().toString(),
                message: state.newPostText = action.newPostText,
                likesCount: 0
            }

            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';   ///зануление

            return stateCopy
        }


        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state

    }
}

export const addPostActionCreator = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    } as const
}

export const setUserProfileActionCreator = (profile: any) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    } as const
}

export const setStatusActionCreator = (status: string) => {
    return {
        type: SET_STATUS,
        status: status
    } as const
}

export const updateNewPostTextActionCreator = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile( Number(userId)).then(response => {
        dispatch(setUserProfileActionCreator(response.data))
    })
}
export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus( Number(userId)).then(response => {
        dispatch(setStatusActionCreator(response.data))
    })
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatusActionCreator(status))
        }
    })
}

export default profileReducer