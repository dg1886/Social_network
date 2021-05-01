import {rootAppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import React from "react";
import {getAuthUserData} from "./auth-reducer";
import {Dispatch} from "redux";

export type AuthReducerType = {
    initialized: boolean
    // messages: Array<string> | null
}
export type AuthUserDataActionType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
// export type SetAuthUserDataActionType = {
//     type: 'SET-USER-DATA'
//     payload: AuthUserDataActionType
// }


export type initializedAppActionsTypes =
    ReturnType<typeof initializedSuccess>

export const SET_INITIALIZED = 'SET-INITIALIZED';


let initialState = {
    initialized: false,
}
type ThunkType = ThunkAction<void, rootAppStateType, unknown, initializedAppActionsTypes>

const appReducer = (state: AuthReducerType = initialState, action: initializedAppActionsTypes): AuthReducerType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}
export const initializedSuccess = () =>
    ({type: SET_INITIALIZED})

type initializedActionType = ReturnType<typeof initializedSuccess>

export const initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    promise.then( () => {
        dispatch(initializedSuccess())
    })
}

export default appReducer

//ThunkDispatch<rootAppStateType, unknown, authUsersActionsTypes>