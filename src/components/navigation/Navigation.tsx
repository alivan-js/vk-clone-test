import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className={"navigation"}>
            <ul>
                <li><NavLink to={"/profile"}><img src={"/assets/svg/profile.svg"} alt={"Profile"}/>Профиль</NavLink></li>
                <li><NavLink to={"/chat"}><img src={"/assets/svg/chat.svg"} alt={"Chat"}/>Чат</NavLink></li>
                <li><NavLink to={"/users"}><img src={"/assets/svg/friends.svg"} alt={"Users"}/>Пользователи</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;