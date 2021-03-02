import React from 'react';

import  {StoreReduxType} from "../../redux/redux-store";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type PropsType = {
   // profilePage: ProfilePageType
   //  // addPost: () => void
   //  // updateNewPostText: (newText: string) => void
   //  dispatch: (action: StateActionsTypes) => void
    store: StoreReduxType
}



const Profile = (props: any) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;

// return (
//     <div>
//         <ProfileInfo/>
//         <MyPostsContainer store={store} profilePage={props.store.getState().profilePage} />
//     </div>
// )