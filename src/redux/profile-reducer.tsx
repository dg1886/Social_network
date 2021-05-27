import {PostType, StateActionsTypes} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

export type PhotosType = {
    small: string | null
    large: string | null
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
    isOwner: boolean
    aboutMe: string
}

export type ProfilePageType = {
    posts: Array<PostType>

    profile: ProfileType | null
    status: string
}

export type ProfileActionsTypes =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfileActionCreator>
    | ReturnType<typeof setStatusActionCreator>
    | ReturnType<typeof deletePostActionCreator>
    | ReturnType<typeof savePhotoSuccess>


export const ADD_POST = 'ADD-POST';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';
export const SET_STATUS = 'SET-STATUS';
export const DELETE_POST = 'DELETE-POST';
export const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [
        {id: Date.now().toString(), message: 'hello', likesCount: 1},
        {id: Date.now().toString(), message: 'i', likesCount: 0},
        {id: Date.now().toString(), message: 'lol', likesCount: 0}
    ],
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: StateActionsTypes): ProfilePageType => {

    switch (action.type) {

        case ADD_POST: {
            let newPost: PostType = {
                id: Date.now().toString(),
                message: action.newPostText,
                likesCount: 0
            }

            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            // stateCopy.newPostText = '';   зануление

            return stateCopy
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

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            if (state.profile) {
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos}
                }
            }
            return state
        }


        default:
            return state

    }
}

export const addPostActionCreator = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText
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

export const deletePostActionCreator = (postId: string) => {
    return {
        type: DELETE_POST,
        postId: postId
    } as const
}

export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos
    } as const
}


export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(Number(userId))
    dispatch(setUserProfileActionCreator(response.data))
}
export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(Number(userId))
    dispatch(setStatusActionCreator(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusActionCreator(status))
    }
}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export default profileReducer