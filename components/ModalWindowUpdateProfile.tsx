import { FC } from "react";
import Image from "next/image";
import HelperText from "@/components/HelperText";
import LabelText from "./LabelText";
import TextField from "./TextField";
import Button from "./Button";
import TextFieldUploads from "./TextFieldUploads";
import styles from "./../stylescomponent/ModalWindowUpdateProfile.module.css";

type ModalWindowUpdateProfileProps = {
    id: string;
    avatarUrl: string;
    email: string;
    fullName: string;
    closeModalWindowUpdateProfile: () => void;
    preView: any;
    funcChange: (itemValue: string, itemName: string) => void;
    funcUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    funcClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkEmailPass: boolean
}

const ModalWindowUpdateProfile: FC<ModalWindowUpdateProfileProps> = ({ id, avatarUrl, email, fullName, closeModalWindowUpdateProfile, preView, funcChange, funcUploadChange, funcClick, checkEmailPass }) => {

    return (
        <div>
            {preView === '' ? <Image
                src={`/image/accounts/${id}/${avatarUrl}`}
                width={100}
                height={100}
                alt="аватар"
                style={{ borderRadius: "50%" }}
                priority={true}
            /> : <Image
                src={preView}
                width={100}
                height={100}
                alt="аватар"
                style={{ borderRadius: "50%" }}
                priority={true}
            />
            }
            <div className={`${styles.formContainer} z-depth-2`}>
                <LabelText text={"Загрузите файл"} />
                <TextFieldUploads
                    typeText={"file"}
                    funcUploadChange={funcUploadChange} />
                <form>
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
                    <Button text={"обновить"} funcClick={funcClick} />
                    <Button text={"закрыть"} funcClick={closeModalWindowUpdateProfile} />
                </form>
            </div>
        </div>
    );
}

export default ModalWindowUpdateProfile;