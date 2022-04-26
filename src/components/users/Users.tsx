import React, {useEffect, useRef, MutableRefObject} from 'react';
import s from "./Users.module.scss"
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/store";
import User from './User';
import {clearUsers, fetchUsers, setPage} from "../../redux/reducers/users";
import Loader from '../loader/Loader';
import {WithAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from 'redux';

const Users = () => {

    const lastElement = useRef() as MutableRefObject<HTMLInputElement>
    const observer = useRef()

    const page = useAppSelector(state => state.users.page)
    const totalPage = useAppSelector(state => state.users.totalPage)
    const users = useAppSelector(state => state.users.users)
    const isLoading = useAppSelector(state => state.users.isFetchingUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers(page))
    }, [page])

    useEffect(() => {
        return () => {
            dispatch(clearUsers())
        }
    }, [])

    useEffect(() => {
        // @ts-ignore
        if (observer.current) observer.current.disconnect()
        let callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting && page < totalPage) {
                dispatch(setPage(page + 1))
            }
        };

        // @ts-ignore
        observer.current = new IntersectionObserver(callback);
        // @ts-ignore
        observer.current.observe(lastElement.current)
    }, [isLoading])

    // Правильная типизация?

    return (
        <div className={s.content}>
            <div className={s.filter}>
                <input/>
            </div>
            <div className={s.body}>
                {users.map(el => {
                        return <User key={el.id} img={el.photos?.small} name={el.name} isFollowed={el.followed}
                                     id={el.id}/>
                    }
                )}
                {isLoading && <Loader/>}
                <div ref={lastElement}/>
            </div>
        </div>
    );
};

export default compose(WithAuthRedirect)(Users)