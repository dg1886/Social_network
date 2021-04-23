import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/store";
import store from "../../../redux/redux-store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type propsPostType = {
    addPost: (value: string) => void
    posts: Array<PostType>
    // newPostText: string
}
type AddNewPostDataType = {
    newPostText: string
    addPost: (values: string) => void
}



const MyPosts = (props: propsPostType) => {

    let postsElements =
        // props.profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);
        // props.store.getState().profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);
        store.getState().profilePage.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);



    let addPost = (values: AddNewPostDataType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}


const maxLength50 = maxLengthCreator(50)

const AddNewPostForm:  React.FC<InjectedFormProps<AddNewPostDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} validate = {[requiredField, maxLength50]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddNewPostDataType>({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

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
