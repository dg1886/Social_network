import {ChangeEvent} from "react";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer, {DialogsActionsTypes} from "./dialogs-reducer";
import {UsersActionsTypes} from "./users-reducer";

export type MessageType = {
    id: number
    message: string
}
export type PostType = {
    id: string
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type UsersLocationType = {
    city: string
    country: string
}
export type UsersType = {
    id: number
    followed: boolean
    name: string
    status: string
    location: UsersLocationType
    photos: any
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type UsersPageType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export type MessagePageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}


export type StateType = {
    profilePage: ProfilePageType     /// post + newPostText
    messagesPage: MessagePageType
}


export type StateActionsTypes = ProfileActionsTypes | DialogsActionsTypes | UsersActionsTypes



export type StoreType = {
    _state: StateType
    _callSubscriber: (state: StateType) => void
    updateNewPostText: (newText: string) => void
    addPost: () => void
    subscribe: (observer: () => void) => void
    getState: () => StateType
    dispatch: (action: StateActionsTypes) => void
}


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hi, how are you?', likesCount: 13},
                {id: '2', message: "It's my first post", likesCount: 12}
            ],
            newPostText: ''
        },

        messagesPage: {
            dialogs: [
                {id: 1, name: 'Igar FatPunch'},
                {id: 2, name: 'Sizy Dog'},
                {id: 3, name: 'Sashka Pravoslavnenky'},
                {id: 4, name: 'Sashka Veter'},
                {id: 5, name: 'Martin Borman'},
                {id: 6, name: 'Michail Redwood'}
            ],
            messages: [
                {id: 1, message: 'What a fuck?'},
                {id: 2, message: 'All Cops Are Bastards'},
                {id: 3, message: 'Yo nigga!'}
            ],
            newMessageBody: ''
        }

    },
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return store._state
    },
    subscribe(observer) {                     //???
        this._callSubscriber = observer
    },

    dispatch(action ) {
        // this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._callSubscriber(this._state)
    },


    addPost() {
    },
    updateNewPostText(newText: string) {

    }
}


// window.store = store


export default store

