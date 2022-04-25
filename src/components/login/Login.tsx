import React from 'react';
import s from "./Login.module.scss"
import Header from "../header/Header";


const Login = () => {
    return (
        <>
            <Header/>
            <div className={"content container"}>
                <main className={s.main}>
                    <div className={s.content}>
                        <div className={s.header}>Вход Насвязи</div>
                        <div className={s.message}>Чтобы просмотреть эту страницу, нужно зайти на сайт.</div>
                        <form action="submit" className={s.form}>
                            <input type="text" placeholder={"Телефон или email"} className={s.input}/>
                            <input type="password" placeholder={"Пароль"} className={s.input}/>
                            <div className={s.checkbox}>
                                <input type="checkbox" id="reminder"/>
                                <label htmlFor="reminder">Чужой компьютер</label>
                            </div>
                            <div className={s.buttons}>
                                <button className={s.button_login}>Войти</button>
                                <button className={s.button_register}>Регистрация</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;