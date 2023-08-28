"use client"
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { FC } from "react";
import { userDataType } from "@/types/type";
import ModalWindowForDeleteProfile from "./ModalWindowForDeleteProfile";
import ModalWindowUpdateProfile from "./ModalWindowUpdateProfile";
import ModalWindowUpdateProfileContainer from "./ModalWindowUpdateProfileContainer";


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
    const [modalWindowUpdateAccount, setModalWindowUpdateAccount] = useState(false);

    const deleteAccount = () => {
        setModalWindow(true)
    }
    const closeModalWindowUpdateProfile = () => {
        setModalWindowUpdateAccount(false)
    }
    const updateAccount = () => {
        setModalWindowUpdateAccount(true)
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
            {modalWindowUpdateAccount ? <ModalWindowUpdateProfileContainer
                id={userData._id}
                avatarUrl={userData.avatarUrl}
                email={userData.email}
                fullName={userData.fullName}
                closeModalWindowUpdateProfile={closeModalWindowUpdateProfile}
            /> : null}
            <ProfileCard
                userData={userData}
                loading={loading}
                photolistuathorcount={photolistuathorcount}
                deleteAccount={deleteAccount}
                updateAccount={updateAccount}
            />
        </>
    );
}

export default ProfileCardContainer;