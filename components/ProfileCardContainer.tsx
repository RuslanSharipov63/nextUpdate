"use client"
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { FC } from "react";
import { userDataType } from "@/types/type";
import ModalWindowForDeleteProfile from "./ModalWindowForDeleteProfile";


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

    const [modalWindow, setModalWindow] = useState(false)

    const deleteAccount = () => {
        setModalWindow(true)
    }

    const closeModalWindow = () => {
        setModalWindow(false)
    }

    return (
        <>
            {modalWindow ? <ModalWindowForDeleteProfile
                id={userData._id}
                closeModalWindow={closeModalWindow}
            /> : null}
            <ProfileCard
                userData={userData}
                loading={loading}
                photolistuathorcount={photolistuathorcount}
                deleteAccount={deleteAccount}
            />
        </>
    );
}

export default ProfileCardContainer;