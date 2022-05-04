import React, {FC, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';
import Layout from "./components/Layout";
import {Nullable, useAppSelector} from './redux/store';
import Login from './components/login/Login';
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./redux/reducers/app";
import {ErrorSnackbar} from "./components/ErrorSnackBar";

const Chat = React.lazy(() => import('./components/chat/Chat'));
const Users = React.lazy(() => import('./components/users/Users'));
const Profile = React.lazy(() => import('./components/profile/Profile'));
const SuspendedChat = <React.Suspense fallback={<div/>}><Chat/></React.Suspense>
const SuspendedProfile = <React.Suspense fallback={<div/>}><Profile/></React.Suspense>
const SuspendedUsers = <React.Suspense fallback={<div/>}><Users/></React.Suspense>

const App: FC = () => {

    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    let id: Nullable<number> | string = useAppSelector<Nullable<number>>(state => state.auth.userData.id)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div/>
    }

    return (
        <>
            <ErrorSnackbar/>
            <React.Suspense fallback={<div>Loading</div>}>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/"} element={<Layout/>}>
                        <Route index element={<Navigate to={"profile"}/>}/>
                        <Route path={"/chat"} element={SuspendedChat}/>
                        <Route path={"/profile"} element={<Navigate to={"/profile/" + id}/>}/>
                        <Route path={"/profile/:id"} element={SuspendedProfile}/>
                        <Route path={"/users"} element={SuspendedUsers}/>
                        <Route path={"*"} element={SuspendedProfile}/>
                    </Route>
                </Routes>
            </React.Suspense>
        </>
    );
}

export default App;