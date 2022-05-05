import React, {FC} from 'react';
import s from "./Profile.module.scss";

type ProfileInfoRowType = {
    title: string
    value: null | string
}

const ProfileInfoRow: FC<ProfileInfoRowType> = React.memo(({title, value}) => {
    return (
        <>
            {value &&
                <div className={s.description__details__body}>
                    <div className={s.description__details__key}>{title}</div>
                    <div className={s.description__details__value}>
                        <div>{value}</div>
                    </div>
                </div>
            }
        </>
    );
})

export default ProfileInfoRow;