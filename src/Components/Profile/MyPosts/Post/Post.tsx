import React from 'react';
import s from './Post.module.css';
import picture from '../../../../img/ava/ava1.jpg'

type PostType = {
    message: string
    likesCount: number
}

const Post = (props: PostType) => {
    return (

        <div className={s.item}>
            <img src = {picture} alt='Avatar img' />
            {props.message}
            <div>
            <span>likes</span> {props.likesCount}
            </div>

        </div>


    )
}

export default Post;