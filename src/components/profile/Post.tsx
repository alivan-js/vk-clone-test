import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {likePost} from "../../redux/reducers/profile";
import s from "./Post.module.scss"
import {Nullable} from "../../redux/store";
import like from "../../assets/svg/like.svg"
import liked from "../../assets/svg/liked.svg"
import avatarUser from "../../assets/img/avatar.jpg"

type PostType = {
    text: string,
    likesCount: number
    id: number
    profileName: string | undefined
    photo: Nullable<string> | undefined
}

const Post: FC<PostType> = React.memo(({text, likesCount, id, profileName, photo}) => {

    const [clicked, setClicked] = useState(false)

    const dispatch = useDispatch()

    const onclickLikeHandler = () => {
        if (!clicked) {
            dispatch(likePost(id))
            setClicked(true)
        }
    }

    return (
        <div className={s.post}>
            <div className={s.post__author}>
                <img src={photo || avatarUser} alt="userAvatar"/>
                <span>{profileName}</span>
            </div>
            <div className={s.post__body}>
                <p>{text}</p>
            </div>
            <div className={s.post__socials}>
                {clicked
                    ? <img src={liked} alt="liked" style={{width: "24px", height: "24px"}}/>
                    : <img onClick={onclickLikeHandler} src={like} alt="like"
                           style={{marginRight: "2px"}}/>
                }
                {likesCount}
            </div>
        </div>
    );
})

export default Post;