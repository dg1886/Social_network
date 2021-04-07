import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getUserProfile, getStatus, ProfileType, updateStatus} from "../../../redux/profile-reducer";
import {rootAppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../redux/store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


type Own = {}

type MatchParamsType = {
    userId: string   // string
}

type MapDispatchType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void  //
    updateStatus: (status: string) => void
}

type MapStateToPropsType = {
    posts: Array<PostType>
    text: string
    profile: Array<ProfileType> | null
    status: string
    // isAuth: boolean
}
// type ProfileContainerPropsType = {
//     // setUserProfileActionCreator: (profile: Array<ProfileType>) => void
//     getUserProfile: (userId: number) => void
// }
type PropsType = RouteComponentProps <MatchParamsType> & MapStateToPropsType & MapDispatchType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
    let userId: string | number = this.props.match.params.userId
       if (!userId) {
           userId = 14603
       }
        this.props.getUserProfile(Number(userId))
        this.props.getStatus(Number(userId))
    }


    render() {
        // if(this.props.isAuth === false) return <Redirect to = {'/login'}/>

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}



let mapStateToProps = (state: rootAppStateType) => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    text: state.profilePage.newPostText,
    status: state.profilePage.status
    // isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps,
        {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect  //редиректит на Login
)(ProfileContainer)





// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)


// type UsersContactsType = {
//     github: string
//     vk: string
//     facebook: string
//     instagram: string
//     twitter: string
//     website: string
//     youtube: string
//     mainLink: string
// }
// type ProfileType = {
//     is: number
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     fullName: string
//     contacts: Array<UsersContactsType>
//     photos: any
// }







