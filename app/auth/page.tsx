"use client";
import { redirect } from 'next/navigation'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import LabelText from "@/components/LabelText";
import HelperText from "@/components/HelperText";
import { validationEmail, validationPassword } from "@/helper/validation";
import { fetchAuth } from "@/store/AuthSlice";
import styles from "./auth.module.css";

const AuthPage = () => {
  const { userData, loading } = useAppSelector(state => state.AuthSlice)
  const dispatch = useAppDispatch();
  const [authInput, setAuthInput] = useState({
    email: "Email",
    password: "",
  });

  const [error, setError] = useState("");
  const [checkEmailPass, setCheckEmailPass] = useState(true);

  const handleChange = (etv: string, etn: string) => {
    setAuthInput({
      ...authInput,
      [etn]: etv,
    });
    setError("");
    setCheckEmailPass(true);
  };
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.target.name;
    setAuthInput({
      ...authInput,
      [key]: "",
    });
  };

  const checkAuth = async (e: any) => {
    e.preventDefault();
    if (
      validationPassword(authInput.password) === false ||
      validationEmail(authInput.email) === false
    ) {
      await setCheckEmailPass(false);
      return;
    } else {
      const userdata = await dispatch(fetchAuth(authInput));
      if ('message' in userdata.payload) {
        await setCheckEmailPass(false);
        return
      }
      if (!('message' in userdata.payload)) {
        await window.localStorage.setItem('token', userdata.payload.token)
        redirect('/account');
     
      }
    }
  };

  /* const redirectAfterAuth = () => {
    if (userData != undefined && 'token' in userData) {
      window.localStorage.setItem('token', userData.token)
      return;
    } else {
     setCheckEmailPass(false);
    }

  } */



  return (
    <div className={styles.container} style={{ marginBottom: "200px" }}>
      <div></div>
      <form>
        <div>
          <HelperText
            text={checkEmailPass ? null : "Некорректно заполнены поля"}
          />
          <LabelText text={"Электронная почта"} />
          <TextField
            typeText={"email"}
            valueText={authInput.email}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="email"
            idText={"email"}
          />
          <HelperText text={error === "" ? null : error} />
        </div>
        <div>
          <LabelText text={"Пароль"} />
          <TextField
            typeText={"password"}
            valueText={authInput.password}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="password"
            idText={"pass"}
          />
        </div>
        <Button text={"войти"} funcClick={checkAuth} />
      </form>
      <div></div>
    </div>
  );
};

export default AuthPage;
