import React from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from '../../redux/store';
import {logoutTC} from "../../redux/reducers/auth";

// require не используется

const Header = () => {

    const dispatch = useDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)

    return (
        <header className="header">
            <div className={"container"}>
                <div className="container header__container">
                    <div className={"header__logo"}><img src={"/assets/img/logo.png"} alt={"Logo"}/><span>насвязи</span></div>
                    {isLogin &&
                        <div className={"header__user"}><img className={"header__user_avatar"} src={"/assets/svg/user.svg"}
                                                             alt={"User avatar"}/>
                            <img
                                onClick={() => {
                                    dispatch(logoutTC())
                                }}
                                src={"/assets/svg/arrow-small.svg"}
                                alt={"Arrow"}/>
                        </div>}
                </div>
            </div>
        </header>
    );
};

export default Header;