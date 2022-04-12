import React from 'react';
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header/>
            <div className={"content container"}>
                <Navigation/>
                <main className={"main"}>
                    <Outlet/>
                </main>
            </div>
        </>
    );
};

export default Layout;