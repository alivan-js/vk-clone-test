import {UserInListType, usersAPI} from "../../utils/api";
import {AppThunk, Nullable} from "../store";

const initialState = {
    users: [] as Array<UserInListType>,
    isFetchingUsers: false,
    isFollowingInProgress: {
        status: false,
        id: null as Nullable<number>
    },
    page: 1,
    totalPage: 1,
    filter: {
        term: "",
        friend: null as Nullable<boolean>
    }
}

export function usersReducer(state = initialState, action: UsersActionsType): InitialStateType {
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
        case "USERS/FETCHING-USERS-SET": {
            return {...state, isFetchingUsers: action.payload}
        }
        case "USERS/FOLLOWING-PROGRESS-SET": {
            return {
                ...state, isFollowingInProgress: {
                    status: action.payload.status, id: action.payload.id
                }
            }
        }
        case "USERS/TOTAL-NUMBER-SET": {
            return {
                ...state, totalPage: action.payload
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
export const setFollowingProgress = (payload: { status: boolean, id: number | null }) =>
    ({type: "USERS/FOLLOWING-PROGRESS-SET", payload}) as const
export const setFetchingUsers = (payload: boolean) => ({type: "USERS/FETCHING-USERS-SET", payload}) as const
export const setTotalNumber = (payload: number) => ({type: "USERS/TOTAL-NUMBER-SET", payload}) as const
export const setPage = (payload: number) => ({type: "USERS/PAGE-SET", payload}) as const
export const setFilter = (filter: FilterType) => ({type: "USERS/FILTER-SET", payload: filter}) as const
export const clearUsers = () => ({type: "USERS/USERS-CLEARED"}) as const

// thunks

export const fetchUsers = (page: number, filter: FilterType): AppThunk => async (dispatch) => {
    dispatch(setFetchingUsers(true))
    dispatch(setFilter(filter))
    const data = await usersAPI.getUsers(page, filter.term, filter.friend)
    dispatch(setTotalNumber(data.totalCount))
    dispatch(addUsers(data.items))
    dispatch(setFetchingUsers(false))
}

export const fetchFollowing = (id: number): AppThunk => async (dispatch) => {
    dispatch(setFollowingProgress({status: true, id}))
    await usersAPI.follow(id)
    dispatch(followUser(id))
    dispatch(setFollowingProgress({status: true, id: null}))
}

export const fetchUnfollowing = (id: number): AppThunk => async (dispatch) => {
    dispatch(setFollowingProgress({status: true, id}))
    await usersAPI.unfollow(id)
    dispatch(followUser(id))
    dispatch(setFollowingProgress({status: true, id: null}))
}

// types

type InitialStateType = typeof initialState

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
    | ReturnType<typeof setFetchingUsers>
    | ReturnType<typeof clearUsers>
    | ReturnType<typeof setFilter>