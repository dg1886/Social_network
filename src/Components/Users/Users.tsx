import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../img/ava/usersAva.jpg";
import {followingInProgressType, UsersType} from "../../redux/store";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {follow, unfollow} from "../../redux/users-reducer";

export type UsersPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<followingInProgressType>

    totalUsersCount: number
    pageSize: number
    users: Array<UsersType>
    onPageChanged: (pageNumber: number) => void
    currentPage: number

    // setUsers: (users: Array<UsersType>) => void
    // toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    // setCurrentPage: (pageNumber: number) => void
    // setTotalUsersCount: (totalCount: number) => void
}

let Users = (props: UsersPropsType) => {

    return (<div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}/>
    <div>
        {
            props.users.map((u) => <User
                user={u}
                key={u.id}
                followingInProgress={props.followingInProgress}
                follow={props.follow}
                unfollow={props.unfollow}/>
            )
        }
    </div>
    </div>)
}


export default Users

//!!props.followingInProgress.length


/*
return (<div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}/>

        {
            props.users.map((u) => <div key={u.id}>
<span>

    <div>
        <NavLink to={'/profile/' + u.id}>
        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="User img"
             className={styles.userPhoto}/>
             </NavLink>
    </div>

    <div>
        {u.followed
            ? <button disabled={props.followingInProgress.some(id => id.userId === u.id)} onClick={() => {
                props.unfollow(u.id)
            }}>Unfollow</button>
            : <button disabled={props.followingInProgress.some(id => id.userId === u.id)} onClick={() => {
                props.follow(u.id)
            }}>Follow</button>}
    </div>

</span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
)
}
*/
