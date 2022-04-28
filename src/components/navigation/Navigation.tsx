import React from 'react';
import {NavLink} from "react-router-dom";

let profile = require("./../../assets/svg/profile.svg")
let chat = require("./../../assets/svg/chat.svg")
let users = require("./../../assets/svg/friends.svg")

const Navigation = () => {
    return (
        <nav className={"navigation"}>
            <ul>
                <li><NavLink to={"/profile"}>
                    <img src={profile}/>Profile</NavLink></li>
                <li><NavLink to={"/chat"}><img src={chat}/>Chat</NavLink></li>
                <li><NavLink to={"/users"}><img src={users}/>Users</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;