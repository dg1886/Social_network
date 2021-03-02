import {PostType, ProfilePageType, StateActionsTypes, StateType} from "./store";

export type ProfileActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>



export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 13},
        {id: 2, message: "It's my first post", likesCount: 12}
    ],
    newPostText: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: StateActionsTypes) => {
    switch (action.type) {

        case ADD_POST: {
            let newPost: PostType = {
                id: 5,
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

export const updateNewPostTextActionCreator = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}

export default profileReducer