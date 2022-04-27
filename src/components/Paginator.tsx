import React, {FC, MutableRefObject, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {AppThunk} from "../redux/store";

type PaginatorProps = {
    observedElement: MutableRefObject<HTMLInputElement>
    totalPage: number
    currentPage: number
    isLoading: boolean
    clearItems: () => { type: string }
    fetchItems: (page: number) => AppThunk
    setPage: (payload: number) => { type: string; payload: number; }
}

const Paginator: FC<PaginatorProps> = ({
                                           observedElement,
                                           totalPage,
                                           currentPage,
                                           isLoading,
                                           fetchItems,
                                           clearItems,
                                           setPage
                                       }) => {

    const observer = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItems(currentPage))
    }, [currentPage])

    useEffect(() => {
        return () => {
            dispatch(clearItems())
        }
    }, [])


    useEffect(() => {
        // @ts-ignore
        if (observer.current) observer.current.disconnect()
        let callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting && currentPage < totalPage) {
                dispatch(setPage(currentPage + 1))
            }
        };

        // @ts-ignore
        observer.current = new IntersectionObserver(callback);
        // @ts-ignore
        observer.current.observe(observedElement.current)
    }, [isLoading])

    return (
        <>
        </>
    );
};

export default Paginator;