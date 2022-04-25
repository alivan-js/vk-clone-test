import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    function ComponentWithRedirect(props: T){
        const isAuth = useSelector((state: RootState) => state.auth.isLogin)

        if (!isAuth) return <Navigate to="/login"/>

        return (
            <Component {...props}/>
        )
    }

    return ComponentWithRedirect
}