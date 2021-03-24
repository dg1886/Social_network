import {Dispatch} from "redux";
import {authAPI} from "../api/api";

export type AuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export type authUsersActionsTypes =
    ReturnType<typeof setAuthUserData>

export const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthReducerType = initialState, action: authUsersActionsTypes): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state
    }
}
export const setAuthUserData = (id: number, email: string, login: string, isAuth: boolean) =>
    ({type: SET_USER_DATA, data: {id, email, login, isAuth}}) as const

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login, isAuth} = response.data.data
                dispatch(setAuthUserData(id, email, login, isAuth))
            }
        })
}


export default authReducer