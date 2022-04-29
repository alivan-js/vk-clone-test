import React, {FC} from 'react';


type MessageType = {
    text: string,
    photo: string
    userName: string
    userId: number
}

const Message: FC<MessageType> = React.memo(({text, photo, userName, userId}) => {
    return (
        <div className={"message"}>
            <div><img className={"header__user_avatar"} src={photo} alt=""/></div>
            <div>
                <div><span className={"message-name"}>{userName}</span>
                </div>
                <div className={"message-text"}>{text}
                </div>
            </div>
        </div>
    );
})

export default Message;