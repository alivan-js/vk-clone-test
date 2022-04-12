import {Dispatch} from "redux"
import {profileAPI} from "../../utils/api";

type initialStateType = {
    posts: Array<PostType>,
    profile: {}
    isLoading: boolean
}

export interface PostType {
    id: number,
    text: string,
    likesCount: number
}

const initialState: initialStateType = {
    posts: [
        {id: 1, text: "asdsadsada", likesCount: 23},
        {id: 2, text: "bbbbbbbbbbbbbbb", likesCount: 13},
        {id: 3, text: "ccccccccccc", likesCount: 43},
    ],
    profile: {},
    isLoading: false
}


type ActionTypes =
    ReturnType<typeof addPost>
    | ReturnType<typeof likePost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setLoading>

export function profile(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case "ADD_POST": {
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, text: action.payload, likesCount: 0}]
            }
        }
        case "LIKE_POST": {
            return {
                ...state,
                posts: state.posts.map(el => el.id === action.payload ? {
                    ...el,
                    likesCount: el.likesCount + 1
                } : {...el})
            }
        }
        case "PROFILE_SET": {
            return {
                ...state,
                profile: action.payload
            }
        }
        case "LOADING_SET": {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default:
            return state
    }
}

export const addPost = (payload: string) => ({
    type: "ADD_POST",
    payload
}) as const

export const likePost = (payload: number) => ({
    type: "LIKE_POST",
    payload
}) as const

export const setProfile = (payload: any) => ({
    type: "PROFILE_SET",
    payload
}) as const

export const setLoading = (payload: boolean) => ({
    type: "LOADING_SET",
    payload
}) as const

export const fetchUserData = (id: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    const data = await profileAPI.getUserData(id)
    dispatch(setProfile(data))
    dispatch(setLoading(false))
}
