import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from 'react';
import s from "./Profile.module.scss";
import userLogo from "../../assets/img/avatar.jpg"

type ProfilePostInputType = {
    setPost: (text: string) => void
    userImg: string | null
}

const ProfilePostInput: FC<ProfilePostInputType> = React.memo(({setPost, userImg}) => {

    const [postText, setPostText] = useState("")

    // callbacks

    const onChangePostHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPostText(e.currentTarget.value)
    }, [])

    const onKeyPressPostHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && postText.trim()) {
            setPost(postText.trim())
            setPostText("")
        }
    }

    return (
        <div className={s.input}>
            {!postText && <img src={userImg || userLogo} alt="userLogo"/>
            }
            <input value={postText}
                   onChange={onChangePostHandler}
                   onKeyPress={onKeyPressPostHandler}
                   style={{width: "100%"}}
                   placeholder="Что у вас нового?"/>
        </div>
    );
})

export default ProfilePostInput;