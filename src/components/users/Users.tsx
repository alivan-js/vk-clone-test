import React, {useRef, MutableRefObject, FC, useCallback, useEffect} from 'react';
import s from "./Users.module.scss"
import {useAppSelector} from "../../redux/store";
import User from './User';
import Loader from '../loader/Loader';
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from 'redux';
import {clearUsers, fetchUsers, FilterType, setFilter, setPage} from "../../redux/reducers/users";
import {useDispatch} from "react-redux";
import {UsersSearchForm} from './UsersSearchForm';
import {useSearchParams} from 'react-router-dom';
import {useOnScreen} from '../../utils/useOnScreen';

const Users: FC = () => {

    const observedElement = useRef() as MutableRefObject<HTMLInputElement>

    const page = useAppSelector(state => state.users.page)
    const totalPage = useAppSelector(state => state.users.totalItems)
    const users = useAppSelector(state => state.users.users)
    const isLoading = useAppSelector(state => state.users.isFetchingUsers)
    const filter = useAppSelector(state => state.users.filter)
    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()

    useEffect(() => {
        const parsed = Object.fromEntries(searchParams)

        let actualFilter = filter
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === "null" ? null : parsed.friend === "true"
        }
        dispatch(fetchUsers(1, actualFilter))
    }, [])

    useEffect(() => {
        if (filter.term === "") {
            setSearchParams({friend: JSON.stringify(filter.friend)})
        } else if (filter.friend === null) {
            setSearchParams({term: filter.term})
        } else if (filter.term === "" && filter.friend === null) {
            setSearchParams({})
        } else {
            setSearchParams({term: filter.term, friend: JSON.stringify(filter.friend)})
        }
    }, [filter])


    const changeFilterCallback = useCallback((filter: FilterType) => {
        dispatch(setFilter(filter))
        dispatch(clearUsers())
        dispatch(setPage(1))
    }, [dispatch, filter])

    useEffect(() => {
        return () => {
            dispatch(clearUsers())
            dispatch(setFilter({term: "", friend: null}))
            dispatch(setPage(1))
        }
    }, [])

    useEffect(() => {
        dispatch(fetchUsers(page, filter))
    }, [filter, page])

    const isOnScreen = useOnScreen(observedElement);

    useEffect(() => {
        if ((page < (Math.ceil(totalPage/10))) && isOnScreen) {
            dispatch(setPage(page + 1))
        }
    }, [isOnScreen])

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
                    {isLoading && <Loader/>}
                    <div ref={observedElement}/>
                </div>
            </div>
        </>
    );
};

export default compose(WithAuthRedirect)(Users)