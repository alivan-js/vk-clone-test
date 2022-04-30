import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {likePost} from "../../redux/reducers/profile";
import s from "./Post.module.scss"

type PostType = {
    text: string,
    likesCount: number
    id: number
    profileName: string | undefined
}

const Post: FC<PostType> = React.memo(({text, likesCount, id, profileName}) => {

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
                <img src={"/assets/img/avatar.jpg"} alt=""/>
                <span>{profileName}</span>
            </div>
            <div className={s.post__body}>
                <p>{text}</p>
            </div>
            <div className={s.post__socials}>
                {clicked
                    ? <img src="/assets/svg/liked.svg" alt="liked" style={{width: "24px", height: "24px"}}/>
                    : <img onClick={onclickLikeHandler} src="/assets/svg/like.svg" alt="like"
                           style={{marginRight: "2px"}}/>
                }
                {likesCount}
            </div>
        </div>
    );
})

export default Post;