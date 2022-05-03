import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {
    addPost,
    changeStatusTC, clearPosts,
    fetchUserData,
    setProfile,
    setStatus,
    updatePhotoTC
} from "../../redux/reducers/profile";
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
    const photoProfile = useAppSelector(state => state.profile.userInfo.photos)
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.id !== undefined) {
            dispatch(fetchUserData(params.id))
        }

        return () => {
            dispatch(setProfile({}))
            dispatch(setStatus(""))
            dispatch(clearPosts())
        }

    }, [dispatch, params.id])

    // callbacks

    const updateStatusCallback = useCallback((status: string) => {
        dispatch(changeStatusTC(status))
    }, [dispatch])

    const setPost = useCallback((postText: string) => {
        dispatch(addPost(postText))
    }, [dispatch])

    const onChangePhotoCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(updatePhotoTC((e.target.files[0])))
        }
    }, [dispatch])


    // почему тут не происходит перерисовки, хотя в стейте новые картинки?

    return (
        <div className={s.content}>
            <div className={s.first__column}>
                <div className={s.first__column__info}>
                    {isOwner
                        ? <label htmlFor="changeImg"><img
                            src={photoProfile?.large || "/assets/img/avatar.jpg"} alt=""
                            className={s.first__column__info__img}/></label>
                        : <img src={photoProfile?.large || "/assets/img/avatar.jpg"} alt=""
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
                                    : <span style={{width: "100%"}}>{profile.status}</span>
                                }

                            </div>
                        </div>
                        <div
                            className={s.description__status}>{profile.userInfo.lookingForAJob && "в поиске работы"}</div>
                    </div>
                    <div className={s.description__details}>
                        {editMode
                            ? <ProfileEditForm profile={profile.userInfo} setEditMode={setEditMode}/>
                            : <ProfileInfo profile={profile.userInfo}/>
                        }
                    </div>
                </div>
                {isOwner &&
                    <ProfilePostInput setPost={setPost} userImg={profile.userInfo.photos?.small}/>
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
