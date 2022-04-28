import React, {FC, MutableRefObject, useEffect, useRef} from 'react';
import {FilterType} from "../redux/reducers/users";

type PaginatorProps = {
    observedElement: MutableRefObject<HTMLInputElement>
    totalPage: number
    currentPage: number
    isLoading: boolean
    clearItems: () => void
    fetchItems: () => void
    setPage: (payload: number) => void
    filter: FilterType
    changeFilter: (filter: FilterType) => void
}

const Paginator: FC<PaginatorProps> = React.memo(({
                                                      observedElement,
                                                      totalPage,
                                                      currentPage,
                                                      isLoading,
                                                      fetchItems,
                                                      clearItems,
                                                      setPage,
                                                      filter,
                                                      changeFilter
                                                  }) => {

    const observer = useRef()

    console.log(filter)

    useEffect(() => {
        fetchItems()
        setPage(1)
    }, [currentPage, filter])

    useEffect(() => {
        return () => {
            clearItems()
            setPage(1)
            changeFilter({term: "", friend: null})
        }
    }, [])


    useEffect(() => {
        // @ts-ignore
        if (observer.current) observer.current.disconnect()
        let callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting && currentPage < totalPage) {
                setPage(currentPage + 1)
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
})

export default Paginator;