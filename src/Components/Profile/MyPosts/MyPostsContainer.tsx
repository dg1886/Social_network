import React, {ChangeEvent} from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from"../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import store, {rootAppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
// import StoreContext from "../../../StoreContext";


// type propsPostType = {
//     store: StoreReduxType
//     profilePage: ProfilePageType
// }
//



let mapStateToProps = (state: rootAppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {

    return {
        addPost: (value: string) => {
            dispatch(addPostActionCreator(value))
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps) (MyPosts)

export default MyPostsContainer;


/*    const MyPostsContainer = (props: any) => {


        return (
            <StoreContext.Consumer>
                {(store: any) => {

                    let addPost = () => {
                        store.dispatch(addPostActionCreator(store.getState().profilePage.newPostText))

                    }
                    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

                        store.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
                    }

                    return <MyPosts updateNewPostText={onPostChange}
                                    addPost={addPost}
                                    postsElements={store.getState().profilePage.posts}
                        // store={store}
                    />
                }

                }
            </StoreContext.Consumer>
        )

    }*/






// const MyPostsContainer = (props: propsPostType) => {
//
//     let addPost = () => {
//         props.store.dispatch(addPostActionCreator(props.profilePage.newPostText))
//
//     }
//     let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//
//         props.store.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
//     }
//
//     return (
//         <MyPosts updateNewPostText={onPostChange}
//                  addPost={addPost}
//                  postsElements={props.profilePage.posts}
//                  store={store}
//         />
//     )
//
// }