"use client";
import { useState, useEffect } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { validationEmail, validationPassword } from "@/helper/validation";
import styles from "./auth.module.css";

const AuthPage = () => {
  const [authInput, setAuthInput] = useState({
    email: "Email",
    password: "",
  });

  const [error, setError] = useState("");
  const [checkEmailPass, setCheckEmailPass] = useState(true)

  const handleChange = (etv: string, etn: string) => {
    setAuthInput({
      ...authInput,
      [etn]: etv,
    });
    setError("");
  };
  const handleFocus = (etn: string) => {
    setAuthInput({
      ...authInput,
      [etn]: "",
    });
  };

  const handleBlur = (): void => {
    let validationEmailResult = validationEmail(authInput.email);
    if (validationEmailResult === false) {
      setError("Не валидный email");
    }

  };

  const checkAuth = (e: any) => {
    e.preventDefault();
    let validationPasswordResult = validationPassword(authInput.password);
    let validationEmailResult = validationEmail(authInput.email);
    if (validationPasswordResult === false || validationEmailResult === false) {
      setCheckEmailPass(false)
    }
  }

  return (
    <div className={styles.container} style={{ marginBottom: "200px" }}>
      <div></div>
      <form>
        <div>
          <p><span className="helper-text">{checkEmailPass ? null : "Некорректно заполнены поля"}</span></p>
          <label htmlFor="email">Электронная почта</label>
          <TextField
            typeText={"text"}
            valueText={authInput.email}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="email"
            idText={"email"}
            funcBlur={handleBlur}
          />
          <span className="helper-text">{error === "" ? null : error}</span>
        </div>
        <div>
          <p>
            <label htmlFor="password">Пароль</label>
          </p>
          <TextField
            typeText={"password"}
            valueText={authInput.password}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="password"
            idText={"pass"}
            funcBlur={handleBlur}
          />
        </div>
        <Button text={'войти'} funcClick={checkAuth} />
      </form>
      <div></div>
    </div>
  );
};

export default AuthPage;
