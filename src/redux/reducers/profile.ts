import {profileAPI, ProfileUserInfoType} from "../../utils/api";
import {AppThunk, Nullable} from "../store";

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
    status: null as Nullable<string>
}

export function profileReducer(state = initialState, action: ProfileActionsType): initialStateType {
    switch (action.type) {
        case "PROFILE/POST-ADDED":
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, text: action.payload, likesCount: 0}]
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

// thunks

export const fetchUserData = (id: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true))
    const data = await profileAPI.getUserData(id)
    const status = await profileAPI.getStatus(id)
    dispatch(setProfile(data))
    dispatch(setStatus(status))
    dispatch(setLoading(false))
}

export const changeStatusTC = (status: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true))
    await profileAPI.updateStatus(status)
    dispatch(setLoading(false))
}

// types

export type ProfileActionsType =
    ReturnType<typeof addPost>
    | ReturnType<typeof likePost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setStatus>