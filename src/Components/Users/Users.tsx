import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../img/ava/usersAva.jpg";
import {UsersType} from "../../redux/store";
import { NavLink } from "react-router-dom";
import axios from "axios";

export type UsersPropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    // setUsers: (users: Array<UsersType>) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber:number) =>  void
    // setCurrentPage: (pageNumber: number) => void
    // setTotalUsersCount: (totalCount: number) => void
}

let Users = (props: UsersPropsType) => {

        let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
        let pages = []
        for(let i=1; i <= pagesCount; i++) {
            pages.push(i)
        }


    return ( <div>
            <div className={styles.pageNumbers}>
                { pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ''}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            </div>

            {
                props.users.map((u) => <div key={u.id}>
<span>

    <div>
        <NavLink to = {'/profile/' + u.id}>
        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="User img"
             className={styles.userPhoto}/>
             </NavLink>
    </div>

    <div>
        {u.followed
            ? <button onClick={() => {
                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                    withCredentials: true,
                    headers: {'API-KEY': '86f9a91e-2262-457f-972b-f0bb39472774'}
                })
                    .then(response => {
                        if(response.data.resultCode == 0) {props.unfollow(u.id)}
                    })

            }}>Unfollow</button>
            : <button onClick={() => {
                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                    withCredentials: true,
                    headers: {'API-KEY': '86f9a91e-2262-457f-972b-f0bb39472774'}
                })
                    .then(response => {
                        if(response.data.resultCode == 0) {props.follow(u.id)}
                    })
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


export default Users