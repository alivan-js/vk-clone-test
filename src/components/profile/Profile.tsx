import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Post from "./Post";
import {addPost, fetchUserData} from "../../redux/reducers/profile";
import s from "./Profile.module.scss"
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../HOC/withAuthRedirect";


let userAvatar = require("./../../assets/Rectangle 12.png")
let emptyCard = require("./../../assets/img/emptycard.png")

const Profile = () => {

    const params = useParams<"id">()

    const posts = useSelector((state: RootState) => state.profile.posts)
    const profile = useSelector((state: RootState) => state.profile.profile)
    const dispatch = useDispatch()

    const [postText, setPostText] = useState("")


    useEffect(() => {
        if (params.id !== undefined) {
            dispatch(fetchUserData(params.id))
        }

    }, [])

    const onChangePostHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPostText(e.currentTarget.value)
    }

    const onKeyPressPostHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && postText.trim()) {
            dispatch(addPost(postText.trim()))
            setPostText("")
        }
    }

    return (
        <div className={s.content}>
            <div className={s.first__column}>
                <div className={s.first__column__info}>
                    <img src={profile?.photos?.large || userAvatar} alt=""/>
                    <button>Редактировать</button>
                </div>
            </div>
            <div className={s.second__column}>
                <div className={s.description}>
                    <div className={s.description__body}>
                        <div>
                            <div className={s.description__name}>{profile.fullName}</div>
                            <div className={s.description__status}> установить статус</div>
                        </div>
                        <div className={s.description__status}>online</div>
                    </div>
                    <div className={s.description__details}>
                        <div className={s.description__details__body}>
                            <div className={s.description__details__key}>День рождения:</div>
                            <div className={s.description__details__value}>
                                <div>15 ноября</div>
                            </div>
                        </div>
                        <div className={s.accordion}>Показать подробную информацию</div>
                    </div>
                </div>
                <div className={s.input}>
                    <img src={userAvatar} alt=""/>
                    <input value={postText}
                           onChange={onChangePostHandler}
                           onKeyPress={onKeyPressPostHandler}
                           placeholder="Что у вас нового?"/>
                </div>
                <div>
                    <div className={s.posts__header}>{posts.length ? "Мои записи" : "Нет записей"}</div>
                    <div>
                        {!posts.length
                            ? <div className={s.empty__posts}><img src={emptyCard} alt=""/>
                                <span>На стене нет пока ни одной записи</span></div>
                            : posts.map(el => <Post id={el.id} key={el.id} text={el.text} likesCount={el.likesCount}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithAuthRedirect(Profile)
