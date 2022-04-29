import React, {FC} from 'react';
import {ProfileUserInfoType} from "../../utils/api";
import ProfileInfoRow from "./ProfileInfoRow";

type ProfileFormType = {
    profile: ProfileUserInfoType
}

const ProfileInfo: FC<ProfileFormType> = React.memo(({profile}) => {

    return (
        <>
            <ProfileInfoRow title={"Обо мне"} value={profile.aboutMe}/>
            <ProfileInfoRow title={"Работа мечты"} value={profile.lookingForAJobDescription}/>
            {/*{*/}
            {/*    Object.keys(profile.contacts).map(el => <ProfileInfoRow title={el} value={profile.contacts[el as keyof ContactsType]}/>)*/}
            {/*}*/}
        </>
    );
})

export default ProfileInfo;