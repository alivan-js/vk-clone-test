import React from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from '../../redux/store';
import {logoutTC} from "../../redux/reducers/auth";

let logo = require("./../../assets/img/logo.png");
let userAvatar = require("./../../assets/svg/user.svg")
let arrow = require("./../../assets/svg/arrow-small.svg")


const Header = () => {

    const dispatch = useDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)

    return (
        <header className="header">
            <div className={"container"}>
                <div className="container header__container">
                    <div className={"header__logo"}><img src={logo} alt={"Logo"}/><span>насвязи</span></div>
                    {isLogin &&
                        <div className={"header__user"}><img className={"header__user_avatar"} src={userAvatar}
                                                             alt={"User avatar"}/>
                            <img
                                onClick={() => {
                                    dispatch(logoutTC())
                                }}
                                src={arrow}
                                alt={"Arrow"}/>
                        </div>}
                </div>
            </div>
        </header>
    );
};

export default Header;