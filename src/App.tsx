import React, {useEffect} from 'react';
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

const App = () => {

    const dispatch = useDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


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