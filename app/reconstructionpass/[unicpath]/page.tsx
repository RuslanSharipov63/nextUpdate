"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import styles from './../../../stylescomponent/Reconstructionpass.module.css'
import LabelText from "@/components/LabelText";
import Title from "@/components/Title";
import HelperText from "@/components/HelperText";
import { changeDisabledButton } from "@/store/ButtonSlice";
import { fetchUpdatePassword } from "@/store/UpdatePasswordSlice";

const ReconstructionPass = () => {
    const { push } = useRouter();
    const params = useParams();
    const dispatch = useAppDispatch();
    const { success, token } = useAppSelector(state => state.UpdatePasswordSlice)
    const { disabledValueUpdate } = useAppSelector(state => state.ButtonSlice)
    const [checkPass, setCheckPass] = useState(false)
    const [valueInput, setValueInput] = useState({
        email: '',
        pass: '',
        passtwo: '',
    })
    const handleChange = (value: string, name: string) => {
        setValueInput({
            ...valueInput,
            [name]: value
        })
    }

    const send = async () => {
        setCheckPass(false)
        await dispatch(changeDisabledButton('disabledValueUpdate'))
        if (valueInput.pass === valueInput.passtwo && valueInput.pass.length > 5 && valueInput.pass.length <= 8) {

            let dataUpdatePass = await {
                email: valueInput.email,
                password: valueInput.pass,
                unicpath: params.unicpath,
            }
            await dispatch(fetchUpdatePassword(dataUpdatePass))

            return;
        } else {
            setCheckPass(true)
            dispatch(changeDisabledButton('disabledValueUpdate'))
        }
    }

    useEffect(() => {
        if (token?.token) {
            push(`/auth`);
            return;
        }
    }, [token?.token])


    return (
        <div className={styles.containerReconsPass}>
            <Title text={'восстановление пароля'} />
            <LabelText text={"email"} />
            {success.success === false && <HelperText text={'обновление не удалось'} />}
            {checkPass && <HelperText text={'не валидный пароль'} />}
            {token?.token && <HelperText text={'пароль обновлен'} />}
            <TextField
                typeText={'text'}
                nameText={'email'}
                funcChange={handleChange}
                idText={'forgotpass'}
                valueText={valueInput.email}
            />
            <LabelText text={"пароль"} />
            <TextField
                typeText={'password'}
                nameText={'pass'}
                funcChange={handleChange}
                idText={'pass'}
                valueText={valueInput.pass}
            />
            <LabelText text={"повторите пароль"} />
            <TextField
                typeText={'password'}
                nameText={'passtwo'}
                funcChange={handleChange}
                idText={'passtwo'}
                valueText={valueInput.passtwo}
            />
            <Button text={'отправить'} funcClick={send} disabled={disabledValueUpdate} />
        </div>
    );
}

export default ReconstructionPass;