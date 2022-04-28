import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Post from "./Post";
import {addPost, changeStatusTC, fetchUserData, updatePhotoTC} from "../../redux/reducers/profile";
import s from "./Profile.module.scss"
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import EditableSpan from "../EditableSpan";
import {Nullable, useAppSelector} from "../../redux/store";
// import userAvatar from "./../../assets/svg/user.svg"
import ProfileEditForm from './ProfileEditForm';
import ProfileInfo from "./ProfileInfo";

let emptyCard = require("./../../assets/img/emptycard.png")

const Profile = () => {

    const params = useParams<"id">()
    const ownerId = useAppSelector<Nullable<number>>(state => state.auth.userData.id)
    const [editMode, setEditMode] = useState(false)

    const isOwner = Number(params.id) === ownerId

    const profile = useAppSelector(state => state.profile)
    const dispatch = useDispatch()


    const [postText, setPostText] = useState("")

    const updateStatusCallback = useCallback((status: string) => {
        dispatch(changeStatusTC(status))
    }, [dispatch])

    useEffect(() => {
        if (params.id !== undefined) {
            dispatch(fetchUserData(params.id))
        }
    }, [params.id])

    const onChangePostHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        setPostText(e.currentTarget.value)
    }, [])

    const onKeyPressPostHandler = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && postText.trim()) {
            dispatch(addPost(postText.trim()))
            setPostText("")
        }
    }, [dispatch])

    const onChangePhotoCallback = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(updatePhotoTC((e.target.files[0])))
        }
    }, [dispatch])

    return (
        <div className={s.content}>
            <div className={s.first__column}>
                <div className={s.first__column__info}>
                    <label htmlFor="changeImg"><img src={profile.userInfo?.photos?.large || "userAvatar"} alt=""
                                                    className={s.first__column__info__img}/></label>
                    {isOwner &&
                        <>
                            <input type={"file"} id={"changeImg"} onChange={onChangePhotoCallback}/>
                            <button
                                onClick={() => {
                                    setEditMode(true)
                                }}
                            >Редактировать</button>
                        </>
                    }
                </div>
            </div>
            <div className={s.second__column}>
                <div className={s.description}>
                    <div className={s.description__body}>
                        <div>
                            <div className={s.description__name}>{profile.userInfo.fullName}</div>
                            <div className={s.description__status}>
                                {isOwner
                                    ?
                                    <EditableSpan
                                        text={profile.status || "Установить статус"} changeText={updateStatusCallback}/>
                                    : <span>{profile.status}</span>
                                }

                            </div>
                        </div>
                        <div
                            className={s.description__status}>{profile.userInfo.lookingForAJob && "looking for a job"}</div>
                    </div>
                    <div className={s.description__details}>
                        {editMode
                            ? <ProfileEditForm profile={profile.userInfo} setEditMode={setEditMode}/>
                            : <ProfileInfo profile={profile.userInfo}/>
                        }
                    </div>
                </div>
                {isOwner &&
                    <div className={s.input}>
                        <img src={"userAvatar"} alt=""/>
                        <input value={postText}
                               onChange={onChangePostHandler}
                               onKeyPress={onKeyPressPostHandler}
                               placeholder="Что у вас нового?"/>
                    </div>
                }
                <div>
                    <div className={s.posts__header}>{profile.posts.length ? "Мои записи" : "Нет записей"}</div>
                    <div>
                        {!profile.posts.length
                            ? <div className={s.empty__posts}><img src={emptyCard} alt=""/>
                                <span>На стене нет пока ни одной записи</span></div>
                            : profile.posts.map(el => <Post id={el.id} key={el.id} text={el.text}
                                                            likesCount={el.likesCount}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithAuthRedirect(Profile)
