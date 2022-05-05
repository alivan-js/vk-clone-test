import React, {FC} from 'react';
import s from "./Profile.module.scss";
import Post from "./Post";
import {PostType} from "../../redux/reducers/profile";
import {Nullable} from "../../redux/store";
import binIcon from "../../assets/svg/bin.svg"

type PostListType = {
    posts: PostType[]
    profileName?: string
    photo?: Nullable<string>
}

const PostList: FC<PostListType> = React.memo(({posts, profileName, photo}) => {
    return (
        <div>
            <div className={s.posts__header}>{posts.length ? "Мои записи" : "Нет записей"}</div>
            <div>
                {!posts.length
                    ? <div className={s.empty__posts}><img src={binIcon} alt="bin"/>
                        <span>На стене нет пока ни одной записи</span></div>
                    : posts.map(el => <Post photo={photo} profileName={profileName} id={el.id} key={el.id}
                                            text={el.text}
                                            likesCount={el.likesCount}/>)}
            </div>
        </div>
    );
})

export default PostList;