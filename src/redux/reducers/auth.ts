import {AppThunk, Nullable} from "../store";
import {
    authAPI,
    LoginParamsType, profileAPI,
    ResultCode,
} from "../../utils/api";
import {handleServerNetworkError} from "../../utils/error";
import {AxiosError} from "axios";
import {clearUserData, setIsLoading, setUserImg} from "./app";

const initialState = {
    isLogin: false,
    userData: {
        id: null as Nullable<number>,
        email: null as Nullable<string>,
        login: null as Nullable<string>
    },
    captcha: null as Nullable<string>

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
        case "AUTH/CAPTCHA-SET": {
            return {...state, captcha: action.url}
        }
        default:
            return state
    }
}

// actions

export const setUserData = (payload: AuthUserData) => ({type: "AUTH/USERDATA-SET", payload}) as const
export const setIsLoggedIn = () => ({type: "AUTH/IS-LOGGED-IN-SET"}) as const
export const setIsLoggedOut = () => ({type: "AUTH/IS-LOGGED-OUT-SET"}) as const
export const setCaptcha = (url: string) => ({type: "AUTH/CAPTCHA-SET", url}) as const

// thunks

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(authTC())
        } else if (res.data.resultCode === ResultCode.Captcha) {
            dispatch(getCaptchaTC())
            handleServerNetworkError(dispatch, res.data.messages[0])
        } else {
            handleServerNetworkError(dispatch, res.data.messages[0])
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    }).finally(() => {
            dispatch(setIsLoading(false))
        }
    )
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    authAPI.logout().then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedOut())
            dispatch(clearUserData())
        } else {
            handleServerNetworkError(dispatch, res.data.messages[0])
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    }).finally(() => {
            dispatch(setIsLoading(false))
        }
    )
}

export const authTC = (): AppThunk => (dispatch) => {
    dispatch(setIsLoading(true))
    return authAPI.me().then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setUserData(res.data.data))
                dispatch(setIsLoggedIn())
                profileAPI.getProfileInfo(res.data.data.id.toString()).then(value => {
                    dispatch(setUserImg(value.photos.small || ""))
                })
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        }
    ).catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err.message)
    }).finally(() => {
            dispatch(setIsLoading(false))
        }
    )
}

export const getCaptchaTC = (): AppThunk => async (dispatch) => {
    const res = await authAPI.captcha()
    dispatch(setCaptcha(res.data.url))
}

// types

export type AuthActionsType =
    ReturnType<typeof setUserData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsLoggedOut>
    | ReturnType<typeof setCaptcha>

export type AuthUserData = {
    id: Nullable<number>
    email: Nullable<string>
    login: Nullable<string>
}


type InitialStateType = typeof initialState