import {PostType, StateActionsTypes} from "./store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

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
}

export type ProfileActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfileActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>


export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
    posts: [
        {id: Date.now().toString(), message: 'hello', likesCount: 1},
        {id: Date.now().toString(), message: 'i', likesCount: 0},
        {id: Date.now().toString(), message: 'lol', likesCount: 0}
    ],
    newPostText: '',
    profile: null
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

export default profileReducer