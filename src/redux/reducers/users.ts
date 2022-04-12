import {Dispatch} from "redux";
import {usersAPI} from "../../utils/api";

type InitialStateProps = {
    users: Array<UsersType>
    page: number
    totalPage: number
    isFetchingUsers: boolean
    isFollowingInProgress: {
        status: boolean,
        id: number | null
    }
}

export interface UsersType {
    id: number
    name: string
    followed: boolean
    photos: {
        small: string | null,
        large: string | null
    }
}

const initialState: InitialStateProps = {
    users: [],
    isFetchingUsers: false,
    isFollowingInProgress: {
        status: false,
        id: null
    },
    page: 1,
    totalPage: 1
}

type ActionTypes =
    ReturnType<typeof addUsers>
    | ReturnType<typeof followUser>
    | ReturnType<typeof setFollowingProgress>
    | ReturnType<typeof setTotalNumber>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setFetchingUsers>

export function users(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case "USERS-ADDED": {
            return {
                // @ts-ignore
                ...state, users: [...state.users, ...action.payload]
            }
        }
        case "USER-FOLLOWED-TOGGLE": {
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload ? {...el, followed: !el.followed} : el)
            }
        }
        case "FETCHING_USERS_SET": {
            return {
                ...state,
                isFetchingUsers: action.payload
            }
        }
        case "FOLLOWING_PROGRESS_SET": {
            return {
                ...state,
                isFollowingInProgress: {
                    status: action.payload.status,
                    id: action.payload.id
                }
            }
        }
        case "TOTAL_NUMBER_SET": {
            return {
                ...state,
                totalPage: action.payload
            }
        }
        case "PAGE_SET": {
            return {
                ...state,
                page: action.payload
            }
        }
        default:
            return state
    }
}

export const addUsers = (payload: UsersType) => ({
    type: "USERS-ADDED",
    payload
}) as const

export const followUser = (payload: any) => ({
    type: "USER-FOLLOWED-TOGGLE",
    payload
}) as const

export const setFollowingProgress = (payload: {
                                         status: boolean,
                                         id: number | null
                                     }
) =>
    ({
        type: "FOLLOWING_PROGRESS_SET",
        payload
    }) as const

export const setFetchingUsers = (payload: boolean) => ({
    type: "FETCHING_USERS_SET",
    payload
}) as const

export const setTotalNumber = (payload: number) => ({
    type: "TOTAL_NUMBER_SET",
    payload
}) as const

export const setPage = (payload: number) => ({
    type: "PAGE_SET",
    payload
}) as const


export const fetchUsers = (page: number) => async (dispatch: Dispatch) => {
    dispatch(setFetchingUsers(true))
    const data = await usersAPI.getUsers(page)
    dispatch(setTotalNumber(data.totalCount))
    dispatch(addUsers(data.items))
    dispatch(setFetchingUsers(false))
}

export const fetchFollowing = (id: number) => async (dispatch: Dispatch) => {
    dispatch(setFollowingProgress({status: true, id}))
    await usersAPI.follow(id)
    dispatch(followUser(id))
    dispatch(setFollowingProgress({status: true, id: null}))
}


export const fetchUnfollowing = (id: number) => async (dispatch: Dispatch) => {
    dispatch(setFollowingProgress({status: true, id}))
    await usersAPI.unfollow(id)
    dispatch(followUser(id))
    dispatch(setFollowingProgress({status: true, id: null}))
}


