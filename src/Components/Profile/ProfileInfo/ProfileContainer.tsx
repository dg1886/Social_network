import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfilePageType, ProfileType, setUserProfileActionCreator} from "../../../redux/profile-reducer";
import {rootAppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../redux/store";


type Own = {}
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
type ProfileContainerPropsType = {
    profile: Array<ProfileType> | null
    setUserProfileActionCreator: (profile: Array<ProfileType>) => void
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

type MapDispatchType = {
    setUserProfileActionCreator: (profile: Array<ProfileType>) => void
}
type MapStateToProps = {
    posts: Array<PostType>
    text: string
    profile: Array<ProfileType> | null
}
let mapStateToProps = (state: rootAppStateType): MapStateToProps => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    text: state.profilePage.newPostText,
})

export default connect<MapStateToProps, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {setUserProfileActionCreator})(ProfileContainer)













