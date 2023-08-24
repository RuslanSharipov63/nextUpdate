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
  const { success, loading } = useAppSelector(
    (state) => state.DeleteProfileSlice
  );
  const deleteProfile = () => {
    dispatch(fetchDeleteProfile(id));
  };

  const deletePhotoProfile = async () => {
    await dispatch(fetchDeletePhotoProfile(id));
    await window.localStorage.clear();
    await closeModalWindow();
    await push("/auth");
  };
  useEffect(() => {
    if (success.success) {
      deletePhotoProfile();
      return;
    }
  }, [success.success]);

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
