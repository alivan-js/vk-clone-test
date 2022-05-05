import React, {FC} from 'react';
import s from "./Users.module.scss";
import {useDispatch} from "react-redux";
import {fetchFollowing, fetchUnfollowing} from "../../redux/reducers/users";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../redux/store";
import userAvatar from "../../assets/img/avatar.jpg"


type UserType = {
    id: number
    img: string | null
    name: string
    isFollowed: boolean
}

const User: FC<UserType> = React.memo(({img, name, isFollowed, id}) => {

    const dispatch = useDispatch()
    const isLoading = useAppSelector(state => state.users.isFollowingInProgress)

    // callbacks

    const onClickFollowHandler = () => {
        dispatch(fetchFollowing(id))
    }

    const onClickUnfollowHandler = () => {
        dispatch(fetchUnfollowing(id))
    }

    return (
        <div className={s.user}>
            <NavLink to={`/profile/${id}`}>
                <img className={s.user__logo}
                     src={img ? img : userAvatar} alt={"UserLogo"}/>
            </NavLink>
            <div className={s.user__body}>
                <NavLink to={`/profile/${id}`}><span className={s.user__name}>{name}</span></NavLink>
                {isFollowed
                    ? <span className={`${s.user__button} ${isLoading.id === id ? s.user__button__isLoading : ""}`}
                            onClick={onClickUnfollowHandler}>Отписаться</span>
                    : <span className={`${s.user__button} ${isLoading.id === id ? s.user__button__isLoading : ""}`}
                            onClick={onClickFollowHandler}>Подписаться</span>
                }
            </div>
        </div>
    );
})

export default User;