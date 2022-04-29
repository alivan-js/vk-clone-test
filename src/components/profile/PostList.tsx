import React, {FC} from 'react';
import s from "./Profile.module.scss";
import Post from "./Post";
import {PostType} from "../../redux/reducers/profile";

type PostListType = {
    posts: PostType[]
    profileName?: string
}

const PostList: FC<PostListType> = React.memo(({posts, profileName}) => {
    return (
        <div>
            <div className={s.posts__header}>{posts.length ? "Мои записи" : "Нет записей"}</div>
            <div>
                {!posts.length
                    ? <div className={s.empty__posts}><img src={"/assets/svg/bin.svg"} alt=""/>
                        <span>На стене нет пока ни одной записи</span></div>
                    : posts.map(el => <Post profileName={profileName} id={el.id} key={el.id} text={el.text}
                                            likesCount={el.likesCount}/>)}
            </div>
        </div>
    );
})

export default PostList;