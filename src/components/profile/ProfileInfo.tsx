import React, { FC } from 'react';
import {ProfileUserInfoType} from "../../utils/api";
import ProfileInfoRow from "./ProfileInfoRow";

type ProfileFormType = {
    profile: ProfileUserInfoType
}


const ProfileInfo: FC<ProfileFormType> = ({profile}) => {

    return (
        <>
            <ProfileInfoRow title={"About me"} value={profile.aboutMe}/>
            <ProfileInfoRow title={"Dream Job"} value={profile.lookingForAJobDescription}/>
            {/*{*/}
            {/*    Object.keys(profile.contacts).map(el => <ProfileInfoRow title={el} value={profile.contacts[el]}/>)*/}
            {/*}*/}
        </>
    );
};

export default ProfileInfo;