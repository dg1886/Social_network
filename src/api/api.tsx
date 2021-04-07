import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '86f9a91e-2262-457f-972b-f0bb39472774'}

})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => {
                return responce.data
            })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`, {})
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId)
            // .then(response => {
            //     this.props.setUserProfileActionCreator(response.data)
            // })
    }
}

export const profileAPI = {

    getProfile(userId: number) {

        return instance.get(`profile/` + userId )
        // .then(response => {
        //     this.props.setUserProfileActionCreator(response.data)
        // })
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    }
}

export const authAPI = {
me() {return instance.get(`auth/me`)}
}


