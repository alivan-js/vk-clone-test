import React, {FC, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import Message from "./Message";
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import {startMessagesListening, stopMessagesListening} from "../../redux/reducers/chat";
import {useAppSelector} from "../../redux/store";
import ChatForm from "./ChatForm";

const Chat: FC = () => {

    const dispatch = useDispatch()
    const messages = useAppSelector(state => state.chat.messages)
    const status = useAppSelector(state => state.chat.status)
    const chatAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    useEffect(() => {
            if (isAutoScroll) {
                chatAnchorRef.current?.scrollIntoView({behavior: "smooth"})
            }
        },
        [messages])

    // callbacks

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 500) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }


    // при первой отправке не прихдоит сообщение обратно в чат, хотя отправляется на сервер

    return (
        <div className={"chat-content"}>
            <div className={"chat-message-top-block"}/>
            <div className={"chat-text"} onScroll={onScrollHandler}>
                {messages.map((el) =>
                    <Message key={el.id}
                             text={el.message}
                             photo={el.photo}
                             userName={el.userName}
                             userId={el.userId}/>)}
                <div ref={chatAnchorRef}/>
            </div>
            <ChatForm status={status}/>
        </div>
    );
};

export default WithAuthRedirect(Chat)