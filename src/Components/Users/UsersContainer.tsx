import React from "react";
import {connect} from "react-redux";
import {rootAppStateType} from "../../redux/redux-store";
import {
    follow,
    setCurrentPage, setToggleIsFetching,
    setUsers, setUsersTotalCount, toggleFollowingProgress,
    unfollow
} from "../../redux/users-reducer";
import {followingInProgressType, UsersType} from "../../redux/store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

export type UsersContainerPropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    isFetching: boolean

    setUsers: (users: Array<UsersType>) => void
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalUsersCount: number) => void
    setToggleIsFetching: (isFetching: boolean) => void
    followingInProgress: Array<followingInProgressType>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUsersTotalCount(data.totalCount)
            })
    }
    onPageChanged=(pageNumber:number)=>{
        this.props.setCurrentPage(pageNumber)
        this.props.setToggleIsFetching(true)

        usersAPI.getUsers(pageNumber, this.props.pageSize)
        // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {withCredentials: true})
            .then(data => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            currentPage={this.props.currentPage}
            follow={this.props.follow}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            unfollow={this.props.unfollow}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
            followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}

let mapStateToProps = (state: rootAppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps, {follow, unfollow, setUsers,
    setCurrentPage, setUsersTotalCount, setToggleIsFetching, toggleFollowingProgress} ) (UsersContainer)



