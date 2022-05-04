import {Dispatch} from "redux";
import {setError, setIsLoading} from "../redux/reducers/app";
import {RootAppActionsType} from "../redux/store";
import {CommonResponseType} from "./api";

export const handleServerNetworkError = (dispatch: Dispatch<RootAppActionsType>, error: string) => {
    dispatch(setError(error))
    dispatch(setIsLoading(false))
}

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch<RootAppActionsType>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))

    } else {
        dispatch(setError("Some error occurred"))
    }
    dispatch(setIsLoading(false))
}