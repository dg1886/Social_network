import React from 'react';
import Header from "./Header";
import axios from "axios";
import {rootAppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

type Own = {}
type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchType = {
    logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchType

class HeaderContainer extends React.Component<PropsType> {
    // componentDidMount() {
    //     // this.props.setToggleIsFetching(true)
    //     this.props.getAuthUserData()
    // }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: rootAppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login || ''
})

export default connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {logout} ) (HeaderContainer)