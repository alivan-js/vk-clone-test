import {AppThunk, Nullable} from "../store";
import {authTC} from "./auth";
import {profileAPI} from "../../utils/api";

const initialState = {
    isInitialized: false,
    error: null as Nullable<string>,
    isLoading: false,
    userImg: null as Nullable<string>
}

export function appReducer(state = initialState, action: AppActionsType): InitialStateType {
    switch (action.type) {
        case "APP/INITIALIZED-SET": {
            return {...state, isInitialized: true}
        }
        case "APP/USER-IMG-SET": {
            return {...state, userImg: action.payload}
        }
        case "APP/ERROR-SET": {
            return {...state, error: action.payload}
        }
        case "APP/IS-LOADING-SET": {
            return {...state, isLoading: action.payload}
        }
        default:
            return state
    }
}

// actions

export const setInitialized = () => ({type: "APP/INITIALIZED-SET"}) as const
export const setUserImg = (img: string) => ({type: "APP/USER-IMG-SET", payload: img}) as const
export const setError = (error: Nullable<string>) => ({type: "APP/ERROR-SET", payload: error}) as const
export const setIsLoading = (status: boolean) => ({type: "APP/IS-LOADING-SET", payload: status}) as const

// thunks

export const initializeAppTC = (): AppThunk => (dispatch) => {
    Promise.all([dispatch(authTC())]).then(
        (value) => {
            dispatch(setInitialized())
            if (value.length) {
                // @ts-ignore
                value[0] && dispatch(setUserDataTC(value[0]))
            }
        }
    )
}

export const setUserDataTC = (id: any): AppThunk => async (dispatch) => {
    let userData = await profileAPI.getProfileInfo(id)
    // @ts-ignore
    dispatch(setUserImg(userData.photos.small))
}

// types

export type AppActionsType =
    ReturnType<typeof setInitialized> | ReturnType<typeof setUserImg> | ReturnType<typeof setError> | ReturnType<typeof setIsLoading>

type InitialStateType = typeof initialState