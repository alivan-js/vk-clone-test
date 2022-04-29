import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Message from "./Message";
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import {startMessagesListening, stopMessagesListening} from "../../redux/reducers/chat";
import {useAppSelector} from "../../redux/store";
import ChatForm from "./ChatForm";

const Chat = () => {

    const dispatch = useDispatch()
    const messages = useAppSelector(state => state.chat.messages)
    const status = useAppSelector(state => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div className={"chat-content"}>
            <div className={"chat-text"}>
                {messages.map((el) =>
                    <Message key={new Date().getDate()} text={el.message} photo={el.photo} userName={el.userName}
                             userId={el.userId}/>)
                }
            </div>
            <ChatForm status={status}/>
        </div>
    );
};

export default WithAuthRedirect(Chat)
