import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "3cd3afbd-79c2-4df0-94b4-063eb48d0506"}
})

export const usersAPI = {
    getUsers(page: number) {
        return instance.get(`users?page=${page}`).then((response) => response.data)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`).then((response) => response.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then((response) => response.data)
    }
}

export const authAPI = {
    me() {
        return instance.get("https://social-network.samuraijs.com/api/1.0/auth/me", {withCredentials: true}).then((response) => response.data)
    }
}

export const profileAPI = {
    getUserData(id: string | undefined) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).then((response) => response.data)
    }
}