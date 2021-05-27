import React from "react";
import styles from "./users.module.css";
import usersBlankPhoto from "../../img/ava/usersBlancAva.png";
import {followingInProgressType, UsersType} from "../../redux/store";
import {NavLink} from "react-router-dom";

export type UserPropsType = {
    user: UsersType

    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<followingInProgressType>

    // totalUsersCount: number
    // pageSize: number
    // onPageChanged: (pageNumber: number) => void
    // currentPage: number

    // setUsers: (users: Array<UsersType>) => void
    // toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    // setCurrentPage: (pageNumber: number) => void
    // setTotalUsersCount: (totalCount: number) => void
}

let User = (props: UserPropsType) => {
    let user = props.user

    return <div>
<span>

    <div>
        <NavLink to={'/profile/' + props.user.id}>
        <img src={user.photos.small != null ? user.photos.small : usersBlankPhoto} alt="User img"
             className={styles.userPhoto}/>
             </NavLink>
    </div>

    <div>
        {user.followed
            ? <button disabled={props.followingInProgress.some(id => id.userId === user.id)} onClick={() => {
                props.unfollow(user.id)
            }}>Unfollow</button>
            : <button disabled={props.followingInProgress.some(id => id.userId === user.id)} onClick={() => {
                props.follow(user.id)
            }}>Follow</button>}
    </div>

</span>
        <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
                </span>
    </div>
}


export default User

//!!props.followingInProgress.length