import React, {useEffect, useRef, MutableRefObject} from 'react';
import s from "./Users.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import User from './User';
import {fetchUsers, setPage} from "../../redux/reducers/users";
import Loader from '../loader/Loader';

const Users = () => {

    const lastElement = useRef() as MutableRefObject<HTMLInputElement>
    const observer = useRef()

    const totalPage = useSelector((state: RootState) => state.users.totalPage)
    const page = useSelector((state: RootState) => state.users.page)
    const users = useSelector((state: RootState) => state.users.users)
    const isLoading = useSelector((state: RootState) => state.users.isFetchingUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers(page))
    }, [page])

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

export default Users;