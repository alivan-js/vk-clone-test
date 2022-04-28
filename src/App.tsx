import React, {FC, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';
import Chat from './components/chat/Chat';
import Layout from "./components/Layout";
import Profile from './components/profile/Profile';
import Users from "./components/users/Users";
import {Nullable, useAppSelector} from './redux/store';
import Login from './components/login/Login';
import {useDispatch} from "react-redux";
import Loader from "./components/loader/Loader";
import {initializeAppTC} from "./redux/reducers/app";

const App: FC = () => {

    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    const catchUnhandledErrors = (e: PromiseRejectionEvent): void => {
        alert("Some error occured")
    }

    useEffect(() => {
            window.addEventListener("unhandledrejection", catchUnhandledErrors)
            return () => {
                window.removeEventListener("unhandledrejection", catchUnhandledErrors)
            }
        },
        [])

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

        // нужно ли выходить из инициализации?


    let id: Nullable<number> | string = useAppSelector<Nullable<number>>(state => state.auth.userData.id)

    if (!isInitialized) {
        return <Loader/>
    }

    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<Navigate to={"profile"}/>}/>
                <Route path={"/chat"} element={<Chat/>}/>
                <Route path={"/profile"} element={<Navigate to={"/profile/" + id}/>}/>
                <Route path={"/profile/:id"} element={<Profile/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"*"} element={<Profile/>}/>
            </Route>
        </Routes>
    );
}

export default App;