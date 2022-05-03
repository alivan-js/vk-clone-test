import {Dispatch} from "redux";
import {chatAPI} from "../../utils/chat-api";
import {AppThunk} from "../store";
import {v1} from 'uuid'

const inititialState = {
    messages: [] as MessageTypeWithID[],
    status: "pending" as StatusType
}

export function chatReducer(state = inititialState, action: ChatActionsType): InitialStateType {
    switch (action.type) {
        case "CHAT/MESSAGES-SET": {
            return {
                ...state, messages: [...state.messages, ...action.payload
                    .map(el => ({...el, id: v1()}))
                    .filter((el, index, arr) => index >= arr.length - 20)]
            }
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
export const setStatus = (status: StatusType) => ({type: "CHAT/STATUS-SET", payload: status}) as const
export const clearMessages = () => ({type: "CHAT/MESSAGES-CLEARED"}) as const

// thunks

let _newMessageHandler: ((messages: MessageType[]) => void) | null = null
let _newStatusChangingHandler: ((status: StatusType) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _newMessageHandler
}
const newStatusChangingHandler = (dispatch: Dispatch) => {
    if (_newStatusChangingHandler === null) {
        _newStatusChangingHandler = (status: StatusType) => {
            dispatch(setStatus(status))
        }
    }
    return _newStatusChangingHandler
}


export const startMessagesListening = (): AppThunk => (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("message-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", newStatusChangingHandler(dispatch))
}

export const stopMessagesListening = (): AppThunk => (dispatch) => {
    chatAPI.unsubscribe("message-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", newStatusChangingHandler(dispatch))
    chatAPI.stop()
    dispatch(clearMessages())
}

export const sendMessageTC = (message: string): AppThunk => () => {
    chatAPI.sendMessage(message)
}

// types

type InitialStateType = typeof inititialState

export type MessageType = {
    userId: number
    message: string,
    userName: string,
    photo: string,
}

type MessageTypeWithID = MessageType & { id: string }

export type StatusType = "pending" | "ready" | "error"

export type ChatActionsType =
    ReturnType<typeof setMessages>
    | ReturnType<typeof clearMessages>
    | ReturnType<typeof setStatus>