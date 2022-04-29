import {MessageType} from "../redux/reducers/chat";

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(el => el(newMessages))
}

const createChannel = () => {
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(el => el !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

// types

type SubscriberType = (message: MessageType[]) => void
