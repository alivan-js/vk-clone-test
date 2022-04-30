import {MessageType, StatusType} from "../redux/reducers/chat";

let subscribers = {
    "message-received": [] as MessageReceivedSubscriberType[],
    "status-changed": [] as StatusChangedSubscriberType[],
}


export let ws: WebSocket | null = null

const closeHandler = () => {
    subscribers["status-changed"].forEach(el => el("pending"))
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["message-received"].forEach(el => el(newMessages))
}

const openStatusHandler = () => {
    subscribers["status-changed"].forEach(el => el("ready"))
}

const errorHandlerHandler = () => {
    subscribers["status-changed"].forEach(el => el("error"))
    console.error("REFRESH PAGE")
}

const createChannel = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.addEventListener("open", openStatusHandler)
    ws?.addEventListener("error", errorHandlerHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    subscribers["status-changed"].forEach(el => el("pending"))
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("open", openStatusHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("error", errorHandlerHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["message-received"] = []
        subscribers["status-changed"] = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.addEventListener("open", openStatusHandler)
        ws?.addEventListener("error", errorHandlerHandler)
        ws?.close()
    },
    subscribe(eventName: EventNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubscribe(eventName: EventNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

// types

type MessageReceivedSubscriberType = (message: MessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type EventNamesType = "message-received" | "status-changed"
