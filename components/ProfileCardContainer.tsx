import ProfileCard from "./ProfileCard";
import { FC } from "react";
import { userDataType } from "@/types/type";


type ProfileCardContainerProp = {
    userData: userDataType,
    photolistuathorcount: string | number,
    loading: boolean | string
}

const ProfileCardContainer: FC<ProfileCardContainerProp> = ({
    userData,
    loading,
    photolistuathorcount
}) => {
    return (
        <>
            <ProfileCard
                userData={userData}
                loading={loading}
                photolistuathorcount={photolistuathorcount}
            />
        </>
    );
}

export default ProfileCardContainer;