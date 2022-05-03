import React, {FC} from 'react';
import {ProfileUserInfoType} from "../../utils/api";
import s from "../login/Login.module.scss";
import {useForm} from "react-hook-form";
import {EditParamsType, updateProfileTC} from "../../redux/reducers/profile";
import {useDispatch} from "react-redux";
import {ErrorMessage} from "@hookform/error-message";
import styles from "./Profile.module.scss";

type ProfileEditFormType = {
    profile: ProfileUserInfoType
    setEditMode: (editMode: boolean) => void
}

type valuesType = "aboutMe" | "contacts" | "lookingForAJob" | "lookingForAJobDescription" | "fullName" | "userId" | "contacts.github" | "contacts.vk" | "contacts.facebook" | "contacts.instagram" | "contacts.twitter" | "contacts.website" | "contacts.youtube" | "contacts.mainLink"

const ProfileEditForm: FC<ProfileEditFormType> = React.memo(({profile, setEditMode}) => {

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<EditParamsType>({
        defaultValues: {
            lookingForAJob: profile.lookingForAJob,
            aboutMe: profile.aboutMe,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            fullName: profile.fullName,
            contacts: {
                github: profile.contacts.github,
                vk: profile.contacts.vk,
                facebook: profile.contacts.facebook,
                instagram: profile.contacts.instagram,
                twitter: profile.contacts.twitter,
                website: profile.contacts.website,
                youtube: profile.contacts.youtube,
                mainLink: profile.contacts.mainLink,
            }
        },
        criteriaMode: "all",
        mode: 'onTouched'
    });

    const dispatch = useDispatch()

    const onSubmit = handleSubmit(data => {
            dispatch(updateProfileTC(data))
            setEditMode(false)
        }
    );

    const rowExample = (name: valuesType, desc: string) => {
        return (
            <div className={styles.description__details__body}>
                <div className={styles.description__details__key}>{desc}</div>
                <input style={{border: "1px solid black", marginLeft: "5px"}}
                       {...register(name)}
                />
            </div>
        )
    }

    const rowExampleWithPattern = (name: valuesType, desc: string, patternValue?: RegExp, patternMessage?: string) => {
        return (
            <div className={styles.description__details__body}>
                <div className={styles.description__details__key}>{desc}</div>
                <input style={{border: "1px solid black", marginLeft: "5px"}}
                       {...register(name, {
                           pattern: {
                               value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                               message: "Incorrect url"
                           }
                       })}
                />
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className={s.form}>
            {rowExample("lookingForAJobDescription", "Dream Job")}
            <div className={styles.description__details__body}>
                <div  className={styles.description__details__key}>{"Are you looking for a job?"}</div>
                <div>
                    <input
                        type={"checkbox"}
                        {...register("lookingForAJob")}
                    />
                </div>
            </div>
            {rowExample("fullName", "Name")}
            {rowExample("aboutMe", "About me")}
            {rowExampleWithPattern("contacts.github", "Github", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.github"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.vk", "VK", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.vk"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.facebook", "Facebook", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.facebook"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.instagram", "Instagram", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.instagram"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.twitter", "Twitter", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.twitter"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.website", "Website", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.website"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.youtube", "Youtube", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.youtube"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            {rowExampleWithPattern("contacts.mainLink", "MainLink", /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, "Incorrect url")}
            <ErrorMessage
                errors={errors}
                name="contacts.mainLink"
                render={({messages}) => {
                    return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p key={type} style={{color: "red"}}>{message}</p>
                        ))
                        : null;
                }}
            />
            <button className={s.button_login}>Войти</button>
        </form>
    );
})

export default ProfileEditForm;