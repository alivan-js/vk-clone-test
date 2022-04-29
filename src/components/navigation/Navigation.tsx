import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className={"navigation"}>
            <ul>
                <li><NavLink to={"/profile"}><img src={"/assets/svg/profile.svg"}/>Profile</NavLink></li>
                <li><NavLink to={"/chat"}><img src={"/assets/svg/chat.svg"}/>Chat</NavLink></li>
                <li><NavLink to={"/users"}><img src={"/assets/svg/friends.svg"}/>Users</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;