import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addPost, changeStatusTC, fetchUserData, updatePhotoTC} from "../../redux/reducers/profile";
import s from "./Profile.module.scss"
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import EditableSpan from "../EditableSpan";
import {Nullable, useAppSelector} from "../../redux/store";
import ProfileEditForm from './ProfileEditForm';
import ProfileInfo from "./ProfileInfo";
import PostList from "./PostList";
import ProfilePostInput from "./ProfilePostInput";

const Profile = () => {

    const params = useParams<"id">()
    const ownerId = useAppSelector<Nullable<number>>(state => state.auth.userData.id)
    const [editMode, setEditMode] = useState(false)

    const isOwner = Number(params.id) === ownerId

    const profile = useAppSelector(state => state.profile)
    const dispatch = useDispatch()

    const updateStatusCallback = useCallback((status: string) => {
        dispatch(changeStatusTC(status))
    }, [dispatch])

    useEffect(() => {
        if (params.id !== undefined) {
            dispatch(fetchUserData(params.id))
        }
    }, [params.id])

    const setPost = useCallback((postText: string) => {
        dispatch(addPost(postText))
    }, [dispatch])

    const onChangePhotoCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(updatePhotoTC((e.target.files[0])))
        }
    }, [dispatch])

    return (
        <div className={s.content}>
            <div className={s.first__column}>
                <div className={s.first__column__info}>
                    {isOwner
                        ? <label htmlFor="changeImg"><img
                            src={profile.userInfo?.photos?.large || "/assets/img/avatar.jpg"} alt=""
                            className={s.first__column__info__img}/></label>
                        : <img src={profile.userInfo?.photos?.large || "/assets/img/avatar.jpg"} alt=""
                               className={s.first__column__info__img_1}/>
                    }
                    {isOwner &&
                        <>
                            <input type={"file"} id={"changeImg"} onChange={onChangePhotoCallback}/>
                            <button
                                onClick={() => {
                                    setEditMode(true)
                                }}
                            >Редактировать
                            </button>
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
                    <ProfilePostInput setPost={setPost}/>
                }
                {isOwner
                    ? <PostList posts={profile.posts} profileName={profile.userInfo.fullName}/>
                    : <PostList posts={[]}/>
                }
            </div>
        </div>
    );
}

export default WithAuthRedirect(Profile)
