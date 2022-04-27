import axios from "axios";
import {Nullable} from "../redux/store";
import {EditParamsType, PhotosType} from "../redux/reducers/profile";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "3cd3afbd-79c2-4df0-94b4-063eb48d0506"}
})

export const usersAPI = {
    getUsers(page: number) {
        return instance.get<GetUsersResponseType>(`users?page=${page}`).then((response) => response.data)
    },
    follow(id: number) {
        return instance.post<boolean>(`follow/${id}`).then((response) => response.data)
    },
    unfollow(id: number) {
        return instance.delete<CommonResponseType<{}>>(`follow/${id}`).then((response) => response.data)
    }
}

export const authAPI = {
    me() {
        return instance.get<CommonResponseType<userLoginData>>("/auth/me")
    },
    login(loginData: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId: number }>>("/auth/login", loginData)
    },
    logout() {
        return instance.delete<CommonResponseType<{}>>("/auth/login")
    },
    captcha() {
        return instance.get<{url: string}>("/security/get-captcha-url")
    }
}

export const profileAPI = {
    getUserData(id: string) {
        return instance.get<CommonResponseType<ProfileUserInfoType>>(`/profile/${id}`).then((response) => response.data)
    },
    getStatus(id: string) {
        return instance.get<string>(`/profile/status/${id}`).then((response) => response.data)
    },
    updateStatus(status: string) {
        return instance.put<CommonResponseType<{}>>("/profile/status", {status})
    },
    updatePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<CommonResponseType<PhotosType>>("/profile/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => response.data)
    },
    updateProfile(profileData: EditParamsType) {
        return instance.put<CommonResponseType<{}>>(`/profile`, profileData)
    },
}

// types

type GetUsersResponseType = {
    items: Array<UserInListType>
    totalCount: number
    error: Nullable<string>
}

export type UserInListType = {
    name: string
    id: number
    uniqueUrlName: Nullable<string>
    photos: {
        small: Nullable<string>
        large: Nullable<string>
    },
    status: Nullable<string>
    followed: boolean
}

type CommonResponseType<T> = {
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

export type ProfileUserInfoType = {
    "aboutMe": Nullable<number>
    "contacts": {
        "facebook": Nullable<string>
        "website": Nullable<string>
        "vk": Nullable<string>
        "twitter": Nullable<string>
        "instagram": Nullable<string>
        "youtube": Nullable<string>
        "github": Nullable<string>
        "mainLink": Nullable<string>
    },
    "lookingForAJob": Nullable<boolean>
    "lookingForAJobDescription": Nullable<string>
    "fullName": string
    "userId": number
    "photos": {
        "small": Nullable<string>
        "large": Nullable<string>
    }
}

type userLoginData = {
    id: number
    login: string
    email: string
}