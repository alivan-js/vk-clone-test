import React, {useEffect} from 'react';
import s from "./Login.module.scss"
import Header from "../header/Header";
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {LoginParamsType} from "../../utils/api";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/store";
import {Navigate} from 'react-router-dom';
import {authTC, loginTC, setCaptcha} from "../../redux/reducers/auth";

const Login = () => {

    const dispatch = useDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const captchaUrl = useAppSelector(state => state.auth.captcha)

    useEffect(() => {
        dispatch(authTC())
        return () => {
            dispatch(setCaptcha(""))
        }
    }, [])

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<LoginParamsType>({
        criteriaMode: "all",
        mode: 'onTouched'
    });

    const onSubmit = handleSubmit(data => {
            dispatch(loginTC(data))
        }
    );

    if (isLogin) {
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <Header/>
            <div className={"content container"}>
                <main className={s.main}>
                    <div className={s.content}>
                        <div className={s.header}>Вход Насвязи</div>
                        <div className={s.message}>Чтобы просмотреть эту страницу, нужно зайти на сайт.</div>
                        <form onSubmit={onSubmit} className={s.form}>
                            <input
                                placeholder={"Email"} className={s.input}
                                {...register("email", {
                                    required: "Укажите email",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Некорректный email"
                                    }
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({messages}) => {
                                    return messages
                                        ? Object.entries(messages).map(([type, message]) => (
                                            <p key={type} style={{color: "red"}}>{message}</p>
                                        ))
                                        : null;
                                }}
                            />
                            <input
                                placeholder={"Пароль"} className={s.input} type={"password"}
                                {...register("password", {
                                    required: "Укажите пароль",
                                    minLength: {
                                        value: 4,
                                        message: "Пароль должен быть не менее 3 символов"
                                    }
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({messages}) => {
                                    return messages
                                        ? Object.entries(messages).map(([type, message]) => (
                                            <p key={type} style={{color: "red"}}>{message}</p>
                                        ))
                                        : null;
                                }}
                            />
                            <div className={s.checkbox}>
                                <input {...register("rememberMe")} type="checkbox" id="reminder"/>
                                <label htmlFor="reminder">Remember me</label>
                            </div>
                            {captchaUrl &&
                                <>
                                    <div><img src={captchaUrl} alt={"captcha"}/></div>
                                    <input
                                        className={s.input}
                                        {...register("captcha", {
                                            required: "Введите captcha"
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="captcha"
                                        render={({messages}) => {
                                            return messages
                                                ? Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} style={{color: "red"}}>{message}</p>
                                                ))
                                                : null;
                                        }}
                                    />
                                </>
                            }
                            <button className={s.button_login}>Войти</button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;