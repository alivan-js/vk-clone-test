import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";


type MessageType = {
    text: string,
    photo: string
    userName: string
    userId: number
}

const Message: FC<MessageType> = React.memo(({text, photo, userName, userId}) => {

    const navigate = useNavigate();

    return (
        <div className={"message"}>
            <div style={{cursor: "pointer"}} onClick={() => {
                navigate(`/profile/${userId}`)
            }}>
                <img className={"header__user_avatar"} src={photo || "/assets/img/avatar.jpg"} alt=""/>
            </div>
            <div>
                <div><span className={"message-name"}>{userName}</span>
                </div>
                <div className={"message-text"}>
                    {text}
                </div>
            </div>
        </div>
    );
})

export default Message;