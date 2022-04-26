export function chatReducer(state: InitialStateType = {messages: []}, action: ChatActionsType): InitialStateType {
    switch (action.type) {
        case "CHAT/MESSAGE-ADDED": {
            return {...state, messages: [...state.messages, {id: state.messages.length + 1, text: action.payload}]}
        }
        default:
            return state
    }
}

// actions

export const addMessage = (payload: string) => ({type: "CHAT/MESSAGE-ADDED", payload}) as const

// types

type InitialStateType = {
    messages: Array<MessageType>
}

export type MessageType = {
    id: number
    text: string,
    name?: string,
    img?: string,
    date?: string
}

export type ChatActionsType = ReturnType<typeof addMessage>