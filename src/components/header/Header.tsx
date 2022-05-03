import React from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from '../../redux/store';
import {logoutTC} from "../../redux/reducers/auth";
import {useNavigate} from 'react-router-dom';
import {LinearProgress} from "@mui/material";

const Header = () => {

    const dispatch = useDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const navigate = useNavigate();
    const userImg = useAppSelector(state => state.app.userImg)
    const status = useAppSelector(state => state.app.isLoading)

    return (
        <>
            <header className="header">
                <div className={"container"}>
                    <div className="container header__container">
                        <div className={"header__logo"}><img src={"/assets/img/logo.png"}
                                                             alt={"Logo"}/><span>насвязи</span>
                        </div>
                        {isLogin &&
                            <div className={"header__user"}>
                                <img className={"header__user_avatar"}
                                     onClick={() => {
                                         navigate("/profile")
                                     }}
                                     src={userImg || "/assets/img/avatar.jpg"}
                                     alt={"User avatar"}/>
                                <span className={"logout"} onClick={() => {
                                    dispatch(logoutTC())
                                }}>Выйти</span>
                            </div>}
                    </div>
                </div>
            </header>
            <div style={{height: "10px"}}>
                {status && <LinearProgress/>}
            </div>
        </>
    );
};

export default Header;