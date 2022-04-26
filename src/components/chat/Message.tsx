import React, {FC} from 'react';

let userAvatar = require("./../../assets/Rectangle 12.png")

type MessageType = {
    text: string
}

const Message: FC<MessageType> = React.memo(({text}) => {
    return (
        <div className={"message"}>
            <div><img className={"header__user_avatar"} src={userAvatar} alt=""/></div>
            <div>
                <div><span className={"message-name"}>Мандалорец</span> <span className={"message-date"}>17:31</span>
                </div>
                <div className={"message-text"}>{text}
                </div>
            </div>
        </div>
    );
})

export default Message;