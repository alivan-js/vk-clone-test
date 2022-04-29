import React, {FC} from 'react';
import s from "./Profile.module.scss";

type ProfileInfoRowType = {
    title: string
    value: any
}

const ProfileInfoRow: FC<ProfileInfoRowType> = React.memo(({title, value}) => {
    return (
        <>
            {value &&
                <div className={s.description__details__body}>
                    <div className={s.description__details__key} style={{width: "75px"}}>{title}</div>
                    <div className={s.description__details__value}>
                        <div>{value}</div>
                    </div>
                </div>
            }
        </>
    );
})

export default ProfileInfoRow;