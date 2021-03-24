import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, ProfileType, setUserProfileActionCreator} from "../../../redux/profile-reducer";
import {rootAppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../redux/store";
import {RouteComponentProps, withRouter } from "react-router-dom";



type Own = {}

type MatchParamsType = {
    userId: string   // string
}
type MapDispatchType = {
    getUserProfile: (userId: number) => void
}

type MapStateToPropsType = {
    posts: Array<PostType>
    text: string
    profile: Array<ProfileType> | null
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
           userId = 2
       }
        this.props.getUserProfile(Number(userId))
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}



let mapStateToProps = (state: rootAppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    text: state.profilePage.newPostText,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)





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







