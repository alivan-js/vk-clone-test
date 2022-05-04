import {ResultCode, UserInListType, usersAPI} from "../../utils/api";
import {AppThunk, Nullable} from "../store";
import {handleServerNetworkError} from "../../utils/error";
import {setIsLoading} from "./app";
import {AxiosError} from "axios";

const initialState = {
    users: [] as Array<UserInListType>,
    isFollowingInProgress: {
        id: null as Nullable<number>
    },
    page: 1,
    totalItems: 1,
    filter: {
        term: "",
        friend: null as Nullable<boolean>
    }
}

export function usersReducer(state = initialState, action: UsersActionsType): UsersInitialStateType {
    switch (action.type) {
        case "USERS/USERS-ADDED": {
            return {
                ...state, users: [...state.users, ...action.payload]
            }
        }
        case "USERS/USER-FOLLOWED-TOGGLED": {
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload ? {...el, followed: !el.followed} : el)
            }
        }
        case "USERS/FOLLOWING-PROGRESS-SET": {
            return {
                ...state, isFollowingInProgress: {
                    id: action.payload.id
                }
            }
        }
        case "USERS/TOTAL-NUMBER-SET": {
            return {
                ...state, totalItems: action.payload
            }
        }
        case "USERS/PAGE-SET": {
            return {
                ...state, page: action.payload
            }
        }
        case "USERS/USERS-CLEARED": {
            return {...state, users: []}
        }
        case "USERS/FILTER-SET": {
            return {...state, filter: action.payload}
        }
        default:
            return state
    }
}

// actions

export const addUsers = (payload: UserInListType[]) => ({type: "USERS/USERS-ADDED", payload}) as const
export const followUser = (payload: any) => ({type: "USERS/USER-FOLLOWED-TOGGLED", payload}) as const
export const setFollowingProgress = (payload: { id: number | null }) =>
    ({type: "USERS/FOLLOWING-PROGRESS-SET", payload}) as const
export const setTotalNumber = (payload: number) => ({type: "USERS/TOTAL-NUMBER-SET", payload}) as const
export const setPage = (payload: number) => ({type: "USERS/PAGE-SET", payload}) as const
export const setFilter = (filter: FilterType) => ({type: "USERS/FILTER-SET", payload: filter}) as const
export const clearUsers = () => ({type: "USERS/USERS-CLEARED"}) as const

// thunks

export const fetchUsers = (page: number, filter: FilterType): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    usersAPI.getUsers(page, filter.term, filter.friend).then((data) => {
        if (!data.error) {
            dispatch(setTotalNumber(data.totalCount))
            dispatch(addUsers(data.items))
        } else {
            handleServerNetworkError(dispatch, data.error)
        }
    }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        }
    ).finally(() => {
        dispatch(setIsLoading(false))
    })
}

export const fetchFollowing = (id: number): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    dispatch(setFollowingProgress({id}))
    usersAPI.follow(id).then((res) => {
        // @ts-ignore
        if (res.resultCode === ResultCode.Success) {
            dispatch(followUser(id))
        } else {
            // @ts-ignore
            handleServerNetworkError(dispatch, res.message)
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, "Some error occurred")
    }).finally(() => {
        dispatch(setFollowingProgress({id: null}))
        dispatch(setIsLoading(false))
    })

    // как сделать альтернативный тип?
}

export const fetchUnfollowing = (id: number): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    dispatch(setFollowingProgress({id}))
    usersAPI.unfollow(id).then((res) => {
            // @ts-ignore
            if (res.resultCode === ResultCode.Success) {
                dispatch(followUser(id))
            } else {
                // @ts-ignore
                handleServerNetworkError(dispatch, res.message)
            }
        }
    ).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, "Some error occurred")
    }).finally(() => {
        dispatch(setFollowingProgress({id: null}))
        dispatch(setIsLoading(false))
    })
}

// types

export type UsersInitialStateType = typeof initialState

export type FilterType = {
    term: string,
    friend: Nullable<boolean>
}

export type UsersActionsType =
    ReturnType<typeof addUsers>
    | ReturnType<typeof followUser>
    | ReturnType<typeof setFollowingProgress>
    | ReturnType<typeof setTotalNumber>
    | ReturnType<typeof setPage>
    | ReturnType<typeof clearUsers>
    | ReturnType<typeof setFilter>