"use client";
import { FC } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import styles from "./../stylescomponent/ModalWindowForDeleteProfile.module.css";
import {
    fetchDeleteProfile,
    fetchDeletePhotoProfile,
} from "@/store/DeleteProfileSlice";
import Loader from "./Loader";

type ModalWindowForDeleteProfileProps = {
    id: string;
    closeModalWindow: () => void;
};

const ModalWindowForDeleteProfile: FC<ModalWindowForDeleteProfileProps> = ({
    id,
    closeModalWindow,
}) => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { succes, loading } = useAppSelector(
        (state) => state.DeleteProfileSlice
    );
    const deleteProfile = () => {
        dispatch(fetchDeleteProfile(id));
    };

    const deletePhotoProfile = () => {
        window.localStorage.clear();
        closeModalWindow();
        push("/auth");
    };

    useEffect(() => {
        console.log(succes)
        if (succes.succes) {
            dispatch(fetchDeletePhotoProfile(id));
            deletePhotoProfile();
        }
    }, [succes]);

    return (
        <div className={styles.modal}>
            {loading === "pending" ? <Loader /> : null}
            <div className={styles.modalContent}>
                <p className={styles.text}>Подтвердите удаление.</p>
                <p className={styles.text}>
                    Вместе с профилем будут удалены все ваши фото.
                </p>
                <div className={styles.modalFooter}>
                    <p className={styles.modalClose} onClick={deleteProfile}>
                        Удалить
                    </p>
                    <p className={styles.modalClose} onClick={closeModalWindow}>
                        Отмена
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalWindowForDeleteProfile;
