import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {sendMessageTC, StatusType} from "../../redux/reducers/chat";
import arrowBigIcon from "../../assets/svg/arrow-big.svg"

type ChatFormType = {
    status: StatusType
}

type MessageType = {
    message: string
}

const ChatForm: FC<ChatFormType> = React.memo(({status}) => {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<MessageType>({
        criteriaMode: "all",
        defaultValues: {
            message: ""
        }
    });

    const onSubmit = handleSubmit(data => {
        if (data.message.trim()) {
            if (!data.message) {
                return
            }
            dispatch(sendMessageTC(data.message))
        }
        reset()
    })

    return (
        <div className={"chat-input"}>
            <form onSubmit={onSubmit}>
                <input disabled={status !== "ready"}
                       placeholder={"Напишите сообщение..."}
                       {...register("message")}
                />
                <button disabled={status === "pending"}>
                    <img src={arrowBigIcon} alt="sendButton"/>
                </button>
            </form>
        </div>
    );
})

export default ChatForm;