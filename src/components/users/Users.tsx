import React, {useRef, MutableRefObject, FC, useCallback, useEffect} from 'react';
import s from "./Users.module.scss"
import {useAppSelector} from "../../redux/store";
import User from './User';
import Loader from '../loader/Loader';
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from 'redux';
import Paginator from "../Paginator";
import {clearUsers, fetchUsers, FilterType, setFilter, setPage} from "../../redux/reducers/users";
import {useDispatch} from "react-redux";
import {UsersSearchForm} from './UsersSearchForm';
import {useSearchParams} from 'react-router-dom';

const Users: FC = () => {

    const lastElement = useRef() as MutableRefObject<HTMLInputElement>
    const page = useAppSelector(state => state.users.page)
    const totalPage = useAppSelector(state => state.users.totalPage)
    const users = useAppSelector(state => state.users.users)
    const isLoading = useAppSelector(state => state.users.isFetchingUsers)
    const filter = useAppSelector(state => state.users.filter)
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()


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

    const clearItemsCallback = useCallback(() => {
        dispatch(clearUsers())
    }, [dispatch])

    const changeFilterCallback = useCallback((filter: FilterType) => {
        dispatch(setFilter(filter))
        dispatch(clearUsers())
        dispatch(setPage(1))
    }, [dispatch, filter])

    const fetchItemsCallback = useCallback(() => {
        dispatch(fetchUsers(page, filter))
    }, [dispatch, page, filter])

    const setPageCallback = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [dispatch, page])

    return (
        <>
            <Paginator observedElement={lastElement} totalPage={totalPage} currentPage={page} isLoading={isLoading}
                       clearItems={clearItemsCallback} fetchItems={fetchItemsCallback} setPage={setPageCallback}
                       filter={filter} changeFilter={changeFilterCallback}/>
            <UsersSearchForm changeFilter={changeFilterCallback} filter={filter}/>
            <div className={s.content}>
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