import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '86f9a91e-2262-457f-972b-f0bb39472774'}

})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    resultCode: number
    messages: Array<string>
}
type LogoutType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    resultCode: number
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => {
                return responce.data
            })
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
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
me() {return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)},

login(email: string, password: string, rememberMe: boolean = false) {
    return instance.post<LoginType>(`auth/login`, {email, password, rememberMe})
},
    logout() {
    return instance.delete<LogoutType>(`auth/login`)
    }
}


