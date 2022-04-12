import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../redux/store';
import {setUserData} from "../../redux/reducers/auth";
import {authAPI} from "../../utils/api";

let logo = require("./../../assets/img/logo.png");
let userAvatar = require("./../../assets/Rectangle 12.png")
let arrow = require("./../../assets/arrow.png")


const Header = () => {

    const dispatch = useDispatch()
    const isLogin = useSelector((state: RootState) => state.auth.isLogin)

    useEffect(() => {
        authAPI.me().then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(setUserData(data.data))
            }
        })
    })


    return (
        <header className="header">
            <div className={"container"}>
                <div className="container header__container">
                    <div className={"header__logo"}><img src={logo} alt={"Logo"}/><span>насвязи</span></div>
                    {isLogin
                        ?
                        <div className={"header__user"}><img className={"header__user_avatar"} src={userAvatar}
                                                             alt={"User avatar"}/><img src={arrow}
                                                                                       alt={"Arrow"}/>
                        </div>
                        : <div>LOGIN</div>}
                </div>
            </div>
        </header>
    );
};

export default Header;