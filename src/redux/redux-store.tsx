import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer
})

let store = createStore(reducers)

export type rootAppStateType = ReturnType<typeof reducers >
export type StoreReduxType = typeof store





export default store