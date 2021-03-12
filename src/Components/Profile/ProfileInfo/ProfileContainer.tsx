import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfileActionCreator} from "../../../redux/profile-reducer";
import {rootAppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../redux/store";
import {RouteComponentProps, withRouter } from "react-router-dom";


type Own = {}

type MatchParamsType = {
    userId: string
}
type MapDispatchType = {
    setUserProfileActionCreator: (profile: Array<ProfileType>) => void
}

type MapStateToPropsType = {
    posts: Array<PostType>
    text: string
    profile: Array<ProfileType> | null
}
type ProfileContainerPropsType = {
    setUserProfileActionCreator: (profile: Array<ProfileType>) => void
}
type PropsType = RouteComponentProps <MatchParamsType> & MapStateToPropsType & MapDispatchType & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
    let userId = this.props.match.params.userId
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId )
            .then(response => {
                this.props.setUserProfileActionCreator(response.data)
            })
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

export default connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {setUserProfileActionCreator})(WithUrlDataContainerComponent)





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







