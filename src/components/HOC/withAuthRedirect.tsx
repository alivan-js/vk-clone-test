import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from "../../redux/store";

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    function ComponentWithRedirect(props: T) {

        const isLogin = useAppSelector(state => state.auth.isLogin)

        if (!isLogin) return <Navigate to="/login"/>

        return (
            <Component {...props}/>
        )
    }

    return ComponentWithRedirect
}