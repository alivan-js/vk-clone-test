import React, {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Nullable} from "../../redux/store";
import {FilterType} from "../../redux/reducers/users";

type UsersSearchFormType = {
    filter: {
        term: string,
        friend: Nullable<boolean>
    },
    changeFilter: (filter: FilterType) => void
}

type filterType = {
    term: string
    friend: string
}

export const UsersSearchForm: FC<UsersSearchFormType> = React.memo(({filter, changeFilter}) => {

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<filterType>({
        criteriaMode: "all",
        defaultValues: {
            term: filter.term,
            friend: JSON.stringify(filter.friend)
        }
    })

    const onSubmit = handleSubmit(data => {
            const friend = data.friend === "null" ? null : data.friend === "true"
            changeFilter({term: data.term, friend})
        }
    )

    useEffect(() => {
        const friend = filter.friend === null ? "" : JSON.stringify(filter.friend)
        if (filter) {
            setValue("term", filter.term)
            setValue("friend", friend)
        }
    }, [filter]);

    return (
        <form onSubmit={onSubmit}>
            <div style={{
                backgroundColor: "white",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 200px"
            }}>
                <input
                    placeholder={"Введите имя пользователя"}
                    {...register("term")}
                />
                <select {...register("friend")}>
                    <option value={"null"}>Все</option>
                    <option value={"true"}>Подписки</option>
                    <option value={"false"}>Другие</option>
                </select>
                <button className={"button_find"}>Найти</button>
            </div>
        </form>
    );
})