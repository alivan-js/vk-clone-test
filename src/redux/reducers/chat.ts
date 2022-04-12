type InitialStateProps = {
    messages: Array<MessageType>
}

export interface MessageType {
    id: number
    text: string,
    name?: string,
    img?: string,
    date?: string
}

const initialState: InitialStateProps = {
    messages: [
        {id: 1, text: "hdslfjdslkjfsldfjsldkjflkdsjflkdsfj"},
        {id: 2, text: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"},
        {id: 3, text: "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
    ]
}

type ActionTypes = ReturnType<typeof addMessage>

export function chat(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case "ADD_MESSAGE": {
            return {...state, messages: [...state.messages, {id: state.messages.length + 1, text: action.payload}]}
        }
        default:
            return state
    }
}

export const addMessage = (payload: string) => ({
    type: "ADD_MESSAGE",
    payload
}) as const