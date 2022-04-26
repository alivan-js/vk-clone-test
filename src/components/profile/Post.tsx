import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {likePost} from "../../redux/reducers/profile";
import s from "./Post.module.scss"

let userAvatar = require("./../../assets/Rectangle 12.png")

type PostType = {
    text: string,
    likesCount: number
    id: number
}

const Post: FC<PostType> = React.memo(({text, likesCount, id}) => {

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
                <img src={userAvatar} alt=""/>
                <span>Малыш Грогу</span>
            </div>
            <div className={s.post__body}>
                <p>{text}</p>
            </div>
            <div className={s.post__socials}>
                <svg onClick={onclickLikeHandler} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 4C14.5384 4.06908 13.1535 4.6743 12.11 5.7L11.99 5.81L11.87 5.7C10.7632 4.61705 9.27844 4.00735 7.73 4C6.21204 4 4.75611 4.60232 3.68181 5.67474C2.60751 6.74716 2.00265 8.20204 2 9.72C2 12.8 3.13 14.27 8.18 18.26L10.87 20.36C11.53 20.88 12.47 20.88 13.13 20.36L15.49 18.52L16.43 17.78C20.96 14.14 22 12.68 22 9.72C21.9974 8.20204 21.3925 6.74716 20.3182 5.67474C19.2439 4.60232 17.788 4 16.27 4H16ZM16.27 5.8C17.3106 5.8 18.3087 6.21268 19.0454 6.94753C19.7821 7.68239 20.1974 8.67943 20.2 9.72V10.02C20.12 12.17 19.13 13.35 14.69 16.86L12.02 18.94C12.0139 18.9435 12.007 18.9454 12 18.9454C11.993 18.9454 11.9861 18.9435 11.98 18.94L9.6 17.1L8.73 16.4C4.6 13.1 3.8 11.98 3.8 9.73C3.8 8.6877 4.21405 7.68809 4.95107 6.95107C5.68809 6.21405 6.6877 5.8 7.73 5.8C9.07 5.8 10.24 6.42 11.3 7.72C11.3851 7.8238 11.4924 7.90724 11.6139 7.96423C11.7354 8.02121 11.8682 8.05029 12.0024 8.04933C12.1366 8.04837 12.2689 8.0174 12.3896 7.95869C12.5103 7.89997 12.6164 7.815 12.7 7.71C13.74 6.41 14.9 5.8 16.27 5.8Z"
                        fill="#99A2AD"/>
                </svg>
                {likesCount}
            </div>
        </div>
    );
})

export default Post;