import React from 'react';
import Header from "./Header";
import axios from "axios";
import {rootAppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {AuthReducerType, setAuthUserData} from "../../redux/auth-reducer";

type Own = {}
type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchType = {
    setAuthUserData: (id: number, email: string, login: string, isAuth: boolean) => void
}

type PropsType = MapStateToPropsType & MapDispatchType

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        // this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {withCredentials: true})
            .then(response => {
               if (response.data.resultCode === 0) {
                   let {id, email, login, isAuth} = response.data.data
                   this.props.setAuthUserData(id, email, login, isAuth)
               }
            })
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: rootAppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login || ''
})

export default connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {setAuthUserData} ) (HeaderContainer)