import React, {FC} from 'react';
import {ProfileUserInfoType} from "../../utils/api";
import s from "../login/Login.module.scss";
import {useForm} from "react-hook-form";
import {EditParamsType, updateProfileTC} from "../../redux/reducers/profile";
import {useDispatch} from "react-redux";
import {ErrorMessage} from "@hookform/error-message";

type ProfileEditFormType = {
    profile: ProfileUserInfoType
    setEditMode: (editMode: boolean) => void
}

const ProfileEditForm: FC<ProfileEditFormType> = ({profile, setEditMode}) => {

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
            dispatch(updateProfileTC({
                userId: profile.userId,
                aboutMe: data.aboutMe,
                lookingForAJob: data.lookingForAJob,
                lookingForAJobDescription: data.lookingForAJobDescription,
                fullName: data.fullName,
                contacts: {
                    github: data.contacts.github,
                    vk: data.contacts.vk,
                    facebook: data.contacts.facebook,
                    instagram: data.contacts.instagram,
                    twitter: data.contacts.twitter,
                    website: data.contacts.website,
                    youtube: data.contacts.youtube,
                    mainLink: data.contacts.mainLink,
                }
            }))
            setEditMode(false)
        }
    );

    return (
        <form onSubmit={onSubmit} className={s.form}>
            <div style={{display: "flex"}}>
                <div>{"Dream Job"}</div>
                <input style={{border: "1px solid black", marginLeft: "5px"}}
                       {...register("lookingForAJobDescription")}
                />
            </div>
            <div style={{display: "flex"}}>
                <div>{"Are you looking for a job?"}</div>
                <div>
                    <input
                        type={"radio"}
                        {...register("lookingForAJob")}
                    />
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div>{"Name"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("fullName")}
                    />
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div>{"About me"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("aboutMe")}
                    />
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div>{"Github"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.github", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"VK"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.vk", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"Facebook"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.facebook", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"Instagram"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.instagram", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"Twitter"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.twitter", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"Website"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.website", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"Youtube"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.youtube", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
            <div style={{display: "flex"}}>
                <div>{"MainLink"}</div>
                <div>
                    <input style={{border: "1px solid black", marginLeft: "5px"}}
                           {...register("contacts.mainLink", {
                               pattern: {
                                   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                                   message: "Incorrect url"
                               }
                           })}
                    />
                </div>
            </div>
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
};

export default ProfileEditForm;