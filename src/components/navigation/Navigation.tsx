import React from 'react';
import {NavLink} from "react-router-dom";
import profileIcon from "../../assets/svg/profile.svg"
import chatIcon from "../../assets/svg/chat.svg"
import usersIcon from "../../assets/svg/friends.svg"

const Navigation = () => {
    return (
        <nav className={"navigation"}>
            <ul>
                <li><NavLink to={"/profile"}><img src={profileIcon} alt={"Profile"}/>Профиль</NavLink></li>
                <li><NavLink to={"/chat"}><img src={chatIcon} alt={"Chat"}/>Чат</NavLink></li>
                <li><NavLink to={"/users"}><img src={usersIcon} alt={"Users"}/>Пользователи</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;