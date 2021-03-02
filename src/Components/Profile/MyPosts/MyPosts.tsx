import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/store";
import store from "../../../redux/redux-store";


type propsPostType = {
    addPost: (value: string) => void
    updateNewPostText: (text: string) => void
    posts: Array<PostType>
    newPostText: string
}



const MyPosts = (props: propsPostType) => {

    let postsElements =
        // props.profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);

        // props.store.getState().profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);
        store.getState().profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);



    let addPost = () => {
        props.addPost(props.newPostText)
        // store.dispatch(addPostActionCreator(store.getState().profilePage.newPostText))
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // let text = newPostElementRef.current?.value
        // if(text) {
            // let action: UpdateNewPostTextType = {type: UPDATE_NEW_POST_TEXT, newText: text}
            // props.dispatch(action)
             props.updateNewPostText(e.currentTarget.value)
            //store.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
        }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((event.ctrlKey) && (event.charCode === 13)) {
            addPost();
        }
    }
    
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                <textarea onChange={onPostChange}
                          value={props.newPostText}
                            onKeyPress={onKeyPressHandler}
                />
                </div>
                <div>
                <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )

}

export default MyPosts;


/*
const MyPosts = (props: any) => {

    let postsElements =
        // props.profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);

        // props.store.getState().profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);
        store.getState().profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);



    let addPost = () => {
        props.addPost()
        // props.dispatch(addPostActionCreator(props.profilePage.newPostText))
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // let text = newPostElementRef.current?.value
        // if(text) {
        // let action: UpdateNewPostTextType = {type: UPDATE_NEW_POST_TEXT, newText: text}
        // props.dispatch(action)

        props.store.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                <textarea onChange={onPostChange}
                          value={ props.store.getState().profilePage.newPostText} />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )

}*/
