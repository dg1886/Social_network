import React from "react";
import {connect} from "react-redux";
import {rootAppStateType} from "../../redux/redux-store";
import {
    follow,
    setCurrentPage, setToggleIsFetching,
    setUsers, setUsersTotalCount,
    unfollow
} from "../../redux/users-reducer";
import {UsersType} from "../../redux/store";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

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
}

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }
    onPageChanged=(pageNumber:number)=>{
        this.props.setCurrentPage(pageNumber)
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(response.data.items)
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
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {follow, unfollow, setUsers,
    setCurrentPage, setUsersTotalCount, setToggleIsFetching} ) (UsersContainer)



