import React from "react";
import LoginReduxForm, {FormDataType} from "./LoginForm";
import {Dispatch} from "redux";
import {connect, useDispatch} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {ThunkAction} from "redux-thunk";
import {rootAppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

/*// type ThunkType = ThunkAction<void, rootAppStateType, unknown, authUsersActionsTypes>
// type LoginPropsType = {
//     loginTC: (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => void
// }*/
type LoginPropsType = {
    isAuth: boolean
}



const Login = (props: LoginPropsType) => {
    const dispatch = useDispatch()
    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }
    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


const mapStateToProps = (state: rootAppStateType) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login)