import React, {useRef, MutableRefObject, FC, useCallback, useEffect, useState} from 'react';
import s from "./Users.module.scss"
import {useAppSelector} from "../../redux/store";
import User from './User';
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from 'redux';
import {clearUsers, fetchUsers, FilterType, setFilter, setPage} from "../../redux/reducers/users";
import {useDispatch} from "react-redux";
import {UsersSearchForm} from './UsersSearchForm';
import {useSearchParams} from 'react-router-dom';
import {useOnScreen} from '../../utils/useOnScreen';

const Users: FC = () => {

    const observedElement = useRef() as MutableRefObject<HTMLInputElement>
    const dispatch = useDispatch()
    const page = useAppSelector(state => state.users.page)
    const totalPage = useAppSelector(state => state.users.totalItems)
    const users = useAppSelector(state => state.users.users)
    const filter = useAppSelector(state => state.users.filter)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFetchedUsers, setIsFetchedUsers] = useState(false)
    const isOnScreen = useOnScreen(observedElement);

    useEffect(() => {
        const parsed = Object.fromEntries(searchParams)

        let actualFilter = filter

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(fetchUsers(1, actualFilter))
    }, [dispatch])

    useEffect(() => {

        const query: any = {}

        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)

        setSearchParams({term: query.term ? query.term : "", friend: query.friend ? query.friend : null})

    }, [filter])

    useEffect(() => {
        return () => {
            dispatch(clearUsers())
            dispatch(setFilter({term: "", friend: null}))
            dispatch(setPage(1))
        }
    }, [])

    useEffect(() => {
        if (!isFetchedUsers) {
            setIsFetchedUsers(true)
            return
        }
        dispatch(fetchUsers(page, filter))
    }, [filter, page])

    useEffect(() => {
        if ((page < (Math.ceil(totalPage / 10))) && isOnScreen) {
            dispatch(setPage(page + 1))
        }
    }, [isOnScreen])

    // callbacks

    const changeFilterCallback = useCallback((filter: FilterType) => {
        dispatch(setFilter(filter))
        dispatch(setPage(1))
        dispatch(clearUsers())
    }, [dispatch, filter])

    return (
        <>
            <UsersSearchForm changeFilter={changeFilterCallback} filter={filter}/>
            <div className={s.content}>
                <div className={s.body}>
                    {users.map(el => {
                            return <User key={el.id} img={el.photos?.small} name={el.name} isFollowed={el.followed}
                                         id={el.id}/>
                        }
                    )}
                    <div ref={observedElement}/>
                </div>
            </div>
        </>
    );
};

export default compose(WithAuthRedirect)(Users)