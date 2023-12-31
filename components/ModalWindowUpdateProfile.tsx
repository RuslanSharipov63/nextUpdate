import { FC } from "react";
import Image from "next/image";
import HelperText from "@/components/HelperText";
import LabelText from "./LabelText";
import TextField from "./TextField";
import Button from "./Button";
import TextFieldUploads from "./TextFieldUploads";
import Loader from "./Loader";
import styles from "./../stylescomponent/ModalWindowUpdateProfile.module.css";

type ModalWindowUpdateProfileProps = {
  id: string;
  avatarUrl: string;
  email: string;
  fullName: string;
  closeModalWindowUpdateProfile: () => void;
  preView: any;
  funcChange: (itemValue: string, itemName: string) => void;
  funcUploadChange?: (e: any) => void;
  funcClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkEmailPass: boolean;
  loader: boolean;
  fileUrl: string;
  disabled?: boolean
};

const ModalWindowUpdateProfile: FC<ModalWindowUpdateProfileProps> = ({
  id,
  avatarUrl,
  email,
  fullName,
  closeModalWindowUpdateProfile,
  preView,
  funcChange,
  funcUploadChange,
  funcClick,
  checkEmailPass,
  loader,
  fileUrl,
  disabled
}) => {

  return (
    <div className={styles.containerModWin}>
      {preView === "" ? (
        <Image
          src={`/image/accounts/${id}/${avatarUrl}`}
          width={100}
          height={100}
          alt="аватар"
          style={{ borderRadius: "50%" }}
          priority={true}
        />
      ) : (
        <Image
          src={preView}
          width={100}
          height={100}
          alt="аватар"
          style={{ borderRadius: "50%" }}
          priority={true}
        />
      )}

      <div className={`${styles.formContainer} z-depth-2`}>
        <LabelText text={"Загрузите файл"} />
        <TextFieldUploads typeText={"file"} funcUploadChange={funcUploadChange && funcUploadChange} />
        <form>
          <HelperText text={fileUrl === "ok" ? "профиль обновлен" : null} />
          <HelperText text={checkEmailPass ? "" : "Данные некорректны"} />
          <LabelText text={"имя"} />
          <TextField
            typeText={"text"}
            valueText={fullName}
            funcChange={funcChange}
            nameText="firstName"
            idText={"firstname"}
          />
          <LabelText text={"Электронная почта"} />
          <TextField
            typeText={"text"}
            valueText={email}
            funcChange={funcChange}
            nameText="email"
            idText={"email"}
          />
          <Button text={"обновить"} funcClick={funcClick} disabled={disabled} />
          <Button text={"закрыть"} funcClick={closeModalWindowUpdateProfile} />
          {loader && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default ModalWindowUpdateProfile;
