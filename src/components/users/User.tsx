import React, {FC} from 'react';
import s from "./Users.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchFollowing, fetchUnfollowing} from "../../redux/reducers/users";
import {NavLink} from "react-router-dom";
import {RootState} from "../../redux/store";

type UserType = {
    id: number
    img: string | null
    name: string
    isFollowed: boolean
}

const User: FC<UserType> = ({img, name, isFollowed, id}) => {

    const dispatch = useDispatch()
    const isLoading = useSelector((state: RootState) => state.users.isFollowingInProgress)

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
                     src={img ? img : "https://cdn-icons-png.flaticon.com/512/219/219983.png"} alt={"UserLogo"}/>
            </NavLink>
            <div className={s.user__body}>
                <NavLink to={`/profile/${id}`}><span className={s.user__name}>{name}</span></NavLink>
                {isFollowed
                    ? <span className={`${s.user__button} ${isLoading.id === id ? s.user__button__isLoading : ""}`}
                            onClick={onClickUnfollowHandler}>Unfollow</span>
                    : <span className={`${s.user__button} ${isLoading.id === id ? s.user__button__isLoading : ""}`}
                            onClick={onClickFollowHandler}>Follow</span>
                }
            </div>
        </div>
    );
};

export default User;