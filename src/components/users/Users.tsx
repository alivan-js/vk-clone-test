import React, {useRef, MutableRefObject} from 'react';
import s from "./Users.module.scss"
import {useAppSelector} from "../../redux/store";
import User from './User';
import Loader from '../loader/Loader';
import {WithAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from 'redux';
import Paginator from "../Paginator";
import {clearUsers, fetchUsers, setPage} from "../../redux/reducers/users";

const Users = () => {

    const lastElement = useRef() as MutableRefObject<HTMLInputElement>
    const page = useAppSelector(state => state.users.page)
    const totalPage = useAppSelector(state => state.users.totalPage)
    const users = useAppSelector(state => state.users.users)
    const isLoading = useAppSelector(state => state.users.isFetchingUsers)

    return (
        <>
            <Paginator observedElement={lastElement} totalPage={totalPage} currentPage={page} isLoading={isLoading} clearItems={clearUsers} fetchItems={fetchUsers} setPage={setPage}/>
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
        </>
    );
};

export default compose(WithAuthRedirect)(Users)