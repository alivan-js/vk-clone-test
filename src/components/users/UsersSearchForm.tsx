import React, {FC} from "react";
import {useForm} from "react-hook-form";
import s from "./Users.module.scss";
import {Nullable} from "../../redux/store";
import {FilterType} from "../../redux/reducers/users";

type UsersSearchFormType = {
    filter: {
        term: string,
        friend: Nullable<boolean>
    },
    changeFilter: (filter: FilterType) => void
}


export const UsersSearchForm: FC<UsersSearchFormType> = React.memo(({filter, changeFilter}) => {

    type filterType = {
        term: string
        friend: string
    }

    const {
        register,
        handleSubmit
    } = useForm<filterType>({
        criteriaMode: "all",
        defaultValues: {
            term: filter.term,
            friend: JSON.stringify(filter.friend)
        }
    });

    const onSubmit = handleSubmit(data => {

            const friend = data.friend === "null" ? null : data.friend === "true"

            changeFilter({term: data.term, friend})

        }
    );

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    placeholder={"Введите имя пользователя"}
                    {...register("term")}
                />
                <select {...register("friend")}>
                    <option value={"null"}>All</option>
                    <option value={"true"}>Followed</option>
                    <option value={"false"}>Unfollowed</option>
                </select>
                <button className={s.button_login}>Найти</button>
            </form>
        </div>
    );
})