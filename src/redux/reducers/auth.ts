import {AppThunk, Nullable} from "../store";
import {authAPI, LoginParamsType} from "../../utils/api";

const initialState = {
    isLogin: false,
    userData: {
        id: null as Nullable<number>,
        email: null as Nullable<string>,
        login: null as Nullable<string>
    }
}

export function authReducer(state = initialState, action: AuthActionsType): InitialStateType {
    switch (action.type) {
        case "AUTH/USERDATA-SET": {
            return {...state, userData: action.payload, isLogin: true}
        }
        case "AUTH/IS-LOGGED-IN-SET": {
            return {...state, isLogin: true}
        }
        case "AUTH/IS-LOGGED-OUT-SET": {
            return {...state, isLogin: false, userData: {id: null, email: null, login: null}}
        }
        default:
            return state
    }
}

// actions

export const setUserData = (payload: any) => ({type: "AUTH/USERDATA-SET", payload}) as const
export const setIsLoggedIn = () => ({type: "AUTH/IS-LOGGED-IN-SET"}) as const
export const setIsLoggedOut = () => ({type: "AUTH/IS-LOGGED-OUT-SET"}) as const

// thunks

export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    const res = await authAPI.login(data)

    if (res.data.resultCode === 0) {
        dispatch(authTC())
    } else {

    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    const res = await authAPI.logout()

    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedOut())
    } else {

    }
}

export const authTC = (): AppThunk => (dispatch) => {
    return authAPI.me().then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setUserData(res.data.data))
                dispatch(setIsLoggedIn())
            }
        }
    )
}

// types

export type AuthActionsType =
    ReturnType<typeof setUserData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsLoggedOut>


type InitialStateType = typeof initialState