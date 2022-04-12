type InitialStateProps = {
    userData: {
        id: number | null
        email: string | null
        login: string | null
    }
    isLogin: boolean
}

const initialState: InitialStateProps = {
    isLogin: false,
    userData: {
        id: null,
        email: null,
        login: null
    }
}

type ActionTypes = ReturnType<typeof setUserData>

export function auth(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case "USERDATA_SET": {
            return {...state, userData: action.payload, isLogin: true}
        }
        default:
            return state
    }
}

export const setUserData = (payload: any) => ({
    type: "USERDATA_SET",
    payload
}) as const