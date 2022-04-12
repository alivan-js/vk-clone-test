import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from "./Message";
import {RootState} from "../../redux/store";
import {addMessage} from '../../redux/reducers/chat';

let arrow = require("./../../assets/arrow.png")
let bigArrow = require("./../../assets/bigArrow.png")

const Chat = () => {

    const dispatch = useDispatch()
    const messages = useSelector((state: RootState) => state.chat.messages)
    const [message, setMessage] = useState<string>("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (message.trim()) {
            dispatch(addMessage(message))
            setMessage("")
        }
    }

    return (
        <div className={"chat-content"}>
            <div className={"chat-header"}>
                <div className={"chat-backButton"}>
                    <img src={arrow} alt="arrow"/>
                    <span>Назад</span>
                </div>
            </div>
            <div className={"chat-text"}>
                {messages.map(el =>
                    <Message key={el.id} text={el.text}/>)
                }
            </div>
            <div className={"chat-input"}>
                <form action="submit">
                    <input type="text"
                           value={message}
                           onChange={onChangeHandler}
                           placeholder={"Напишите сообщение..."}/>
                    <button type={"submit"} onClick={onClickButtonHandler}>
                        <img src={bigArrow} alt=""/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;