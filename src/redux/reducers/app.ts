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
        default:
            return state
    }
}

// actions

export const setInitialized = () => ({type: "APP/INITIALIZED-SET"}) as const
export const setUserImg = (img: string) => ({type: "APP/USER-IMG-SET", payload: img}) as const

// thunks

export const initializeAppTC = (): AppThunk => (dispatch) => {
    let promise = dispatch(authTC())
    Promise.all([promise]).then(
        (value) => {
            dispatch(setInitialized())
            value && dispatch(setUserDataTC(value[0]))
        }
    )
}

export const setUserDataTC = (id: any): AppThunk => async (dispatch) => {
    let userData = await profileAPI.getUserData(id)
    // @ts-ignore
    dispatch(setUserImg(userData.photos.small))
}

// types

export type AppActionsType =
    ReturnType<typeof setInitialized> | ReturnType<typeof setUserImg>

type InitialStateType = typeof initialState