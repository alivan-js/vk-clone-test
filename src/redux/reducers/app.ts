import {AppThunk} from "../store";
import {authTC} from "./auth";

const initialState = {
    isInitialized: false
}

export function appReducer(state = initialState, action: AppActionsType): InitialStateType {
    switch (action.type) {
        case "APP/INITIALIZED-SET": {
            return {...state, isInitialized: true}
        }
        default:
            return state
    }
}

// actions

export const setInitialized = () => ({type: "APP/INITIALIZED-SET"}) as const


// thunks

export const initializeAppTC = (): AppThunk => (dispatch) => {
    let promise = dispatch(authTC())
    Promise.all([promise]).then(
        () => {
            dispatch(setInitialized())
        }
    )
}

// types

export type AppActionsType =
    ReturnType<typeof setInitialized>

type InitialStateType = typeof initialState