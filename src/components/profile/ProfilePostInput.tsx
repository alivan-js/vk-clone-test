import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from 'react';
import s from "./Profile.module.scss";

type ProfilePostInputType = {
    setPost: (text: string) => void
}

const ProfilePostInput: FC<ProfilePostInputType> = React.memo(({setPost}) => {

    const [postText, setPostText] = useState("")

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
            <img src={"/assets/img/avatar.jpg"} alt=""/>
            <input value={postText}
                   onChange={onChangePostHandler}
                   onKeyPress={onKeyPressPostHandler}
                   style={{width: "100%"}}
                   placeholder="Что у вас нового?"/>
        </div>
    );
})

export default ProfilePostInput;