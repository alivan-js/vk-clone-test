import {profileAPI, ProfileUserInfoType, ResultCode} from "../../utils/api";
import {AppThunk, Nullable} from "../store";
import {setIsLoading} from "./app";
import {handleServerNetworkError} from "../../utils/error";
import {AxiosError} from "axios";

type initialStateType = typeof initialState

export type PostType = {
    id: number,
    text: string,
    likesCount: number
}

const initialState = {
    posts: [] as PostType[],
    userInfo: {} as ProfileUserInfoType,
    isLoading: false,
    status: null as Nullable<string>,
}

export function profileReducer(state = initialState, action: ProfileActionsType): initialStateType {
    switch (action.type) {
        case "PROFILE/POST-ADDED":
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, text: action.payload, likesCount: 0}]
            }
        case "PROFILE/POSTS-CLEARED":
            return {
                ...state,
                posts: []
            }
        case "PROFILE/POST-LIKED":
            return {
                ...state,
                posts: state.posts.map(el => el.id === action.payload
                    ? {...el, likesCount: el.likesCount + 1}
                    : el)
            }
        case "PROFILE/PROFILE-SET":
            return {
                ...state, userInfo: action.payload
            }
        case "PROFILE/LOADING-SET":
            return {
                ...state, isLoading: action.payload
            }
        case "PROFILE/STATUS-SET":
            return {
                ...state, status: action.payload
            }
        case "PROFILE/PHOTO-SET":
            return {
                ...state, userInfo: {...state.userInfo, photos: action.photos}
            }
        default:
            return state
    }
}

// actions

export const addPost = (payload: string) => ({type: "PROFILE/POST-ADDED", payload}) as const
export const likePost = (payload: number) => ({type: "PROFILE/POST-LIKED", payload}) as const
export const setProfile = (payload: any) => ({type: "PROFILE/PROFILE-SET", payload}) as const
export const setLoading = (payload: boolean) => ({type: "PROFILE/LOADING-SET", payload}) as const
export const setStatus = (status: string | null) => ({type: "PROFILE/STATUS-SET", payload: status}) as const
export const setPhoto = (photos: PhotosType) => ({type: "PROFILE/PHOTO-SET", photos}) as const
export const clearPosts = () => ({type: "PROFILE/POSTS-CLEARED"}) as const

// thunks

export const fetchUserData = (id: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setIsLoading(true))
    Promise.all([dispatch(fetchProfileInfo(id)), dispatch(fetchProfileStatus(id))]).then((res) => {
        dispatch(setProfile(res[0]))
        //@ts-ignore
        dispatch(setStatus(res[1]))
    }).catch((err) => {
        handleServerNetworkError(dispatch, "Some error occurred")
    }).finally(() => {
        dispatch(setLoading(false))
        dispatch(setIsLoading(false))
    })
}

export const fetchProfileInfo = (id: string): AppThunk => (dispatch) => {
    return profileAPI.getProfileInfo(id).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    })
}

export const fetchProfileStatus = (id: string): AppThunk => (dispatch) => {
    return profileAPI.getStatus(id).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    })
}

export const changeStatusTC = (status: string): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    dispatch(setLoading(true))
    profileAPI.updateStatus(status).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus(status))
        } else {
            handleServerNetworkError(dispatch, res.data.messages[0])
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    }).finally(() => {
        dispatch(setLoading(false))
        dispatch(setIsLoading(false))
    })
}

export const updatePhotoTC = (photoFile: File): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    profileAPI.updatePhoto(photoFile).then((res) => {
        if (res.resultCode === ResultCode.Success) {
            dispatch(setPhoto(res.data))
        } else {
            handleServerNetworkError(dispatch, res.messages[0])
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    }).finally(() => {
        dispatch(setIsLoading(false))
    })
}

export const updateProfileTC = (profileData: EditParamsType): AppThunk => async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(setIsLoading(true))
    const userId = getState().profile.userInfo.userId.toString()
    profileAPI.updateProfile(profileData).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            if (userId != null) {
                dispatch(fetchUserData(userId))
            }
        } else {
            handleServerNetworkError(dispatch, res.data.messages[0])
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)

    }).finally(() => {
        dispatch(setLoading(false))
        dispatch(setIsLoading(false))
    })
}

// types

export type ProfileActionsType =
    ReturnType<typeof addPost>
    | ReturnType<typeof likePost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setPhoto>
    | ReturnType<typeof clearPosts>

export type PhotosType = {
    small: string | null
    large: string | null
}

export type EditParamsType = Omit<ProfileUserInfoType, "id" | "photos">