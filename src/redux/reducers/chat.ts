import {Dispatch} from "redux";
import {chatAPI} from "../../utils/chat-api";
import {AppThunk} from "../store";

const intitialState = {
    messages: [] as MessageType[],
    status: "pending" as "pending" | "ready"
}

export function chatReducer(state = intitialState, action: ChatActionsType): InitialStateType {
    switch (action.type) {
        case "CHAT/MESSAGES-SET": {
            return {...state, messages: [...state.messages, ...action.payload]}
        }
        case "CHAT/MESSAGES-CLEARED": {
            return {...state, messages: []}
        }
        case "CHAT/STATUS-SET": {
            return {...state, status: action.payload}
        }
        default:
            return state
    }
}

// actions

export const setMessages = (messages: MessageType[]) => ({type: "CHAT/MESSAGES-SET", payload: messages}) as const
export const setStatus = (status: "pending" | "ready") => ({type: "CHAT/STATUS-SET", payload: status}) as const
export const clearMessages = () => ({type: "CHAT/MESSAGES-CLEARED"}) as const

// thunks

let _newMessageHandler: ((messages: MessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _newMessageHandler

}

export const startMessagesListening = (): AppThunk => (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunk => (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(clearMessages())
}

export const sendMessageTC = (message: string): AppThunk => (dispatch) => {
    chatAPI.sendMessage(message)

}

// types

type InitialStateType = typeof intitialState

export type MessageType = {
    userId: number
    message: string,
    userName: string,
    photo: string,
}


export type ChatActionsType = ReturnType<typeof setMessages> | ReturnType<typeof clearMessages> | ReturnType<typeof setStatus>