import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {rootAppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

export type AuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
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


export type authUsersActionsTypes =
    ReturnType<typeof setAuthUserData>

export const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}
type ThunkType = ThunkAction<void, rootAppStateType, unknown, authUsersActionsTypes>

const authReducer = (state: AuthReducerType = initialState, action: authUsersActionsTypes): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,

            }

        default:
            return state
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})

export const getAuthUserData = () => (dispatch: any) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login, isAuth} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean):ThunkType => (dispatch) => {
   debugger
    authAPI.login(email, password, rememberMe)
        .then( (res) => {
            if(res.data.resultCode === 0) {
            dispatch(getAuthUserData())
            }
        })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then( (res) => {
            if(res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer