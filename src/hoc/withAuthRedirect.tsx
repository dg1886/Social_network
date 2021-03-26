import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {rootAppStateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: rootAppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}
export function withAuthRedirect <T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if(isAuth === false) return <Redirect to = {'/login'}/>
        return <Component {...restProps as T}/>
    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}