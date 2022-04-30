import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {sendMessageTC, StatusType} from "../../redux/reducers/chat";

type ChatFormType = {
    status: StatusType
}

const ChatForm: FC<ChatFormType> = React.memo(({status}) => {

    const dispatch = useDispatch()

    type MessageType = {
        message: string
    }

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
                <input disabled={status === "pending"}
                       placeholder={"Напишите сообщение..."}
                       {...register("message")}
                />
                <button disabled={status === "pending"}>
                    <img src={"/assets/svg/arrow-big.svg"} alt="sendButton"/>
                </button>
            </form>
        </div>
    );
})

export default ChatForm;