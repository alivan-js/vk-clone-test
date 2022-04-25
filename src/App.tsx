import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';
import Chat from './components/chat/Chat';
import Layout from "./components/Layout";
import Profile from './components/profile/Profile';
import Users from "./components/users/Users";
import {useSelector} from "react-redux";
import { RootState } from './redux/store';
import Login from './components/login/Login';

const App = () => {

    const id = useSelector((state: RootState) => state.auth.userData.id)

    return (
        <>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/"} element={<Layout/>}>
                    <Route path={"/chat"} element={<Chat/>}/>
                    <Route path={"/profile"} element={<Navigate to={"/profile/" + id}/>}/>
                    <Route path={"/profile/:id"}
                           element={<Profile/>}/>
                    <Route path={"/users"} element={<Users/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
