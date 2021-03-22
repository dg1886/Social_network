import React from "react";
import {connect} from "react-redux";
import {rootAppStateType} from "../../redux/redux-store";
import {
    follow,
    followSuccess, getUsers,
    setCurrentPage, setToggleIsFetching,
    setUsers, setUsersTotalCount, toggleFollowingProgress, unfollow,
    unfollowSuccess
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

    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    // setUsers: (users: Array<UsersType>) => void
    // setUsersTotalCount: (totalUsersCount: number) => void
    // setToggleIsFetching: (isFetching: boolean) => void
    // toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<followingInProgressType>
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged=(pageNumber:number)=>{
        this.props.getUsers(pageNumber, this.props.pageSize)
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
            // toggleFollowingProgress={this.props.toggleFollowingProgress}
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

export default connect(mapStateToProps, {follow, unfollow,
    setCurrentPage, toggleFollowingProgress, getUsers} ) (UsersContainer)

