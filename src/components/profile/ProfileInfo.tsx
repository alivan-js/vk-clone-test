import React, {FC} from 'react';
import {ContactsType, ProfileUserInfoType} from "../../utils/api";
import ProfileInfoRow from "./ProfileInfoRow";

type ProfileFormType = {
    profile: ProfileUserInfoType
}

const ProfileInfo: FC<ProfileFormType> = React.memo(({profile}) => {

    return (
        <>
            <ProfileInfoRow title={"Обо мне"} value={profile?.aboutMe}/>
            {
             profile.contacts !== undefined &&   Object.keys(profile.contacts).map(el => <ProfileInfoRow key={el} title={el} value={profile.contacts[el as keyof ContactsType]}/>)
            }
        </>
    );
})

export default ProfileInfo;