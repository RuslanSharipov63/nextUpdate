"use client";
import { useState } from "react";
import TextField from "@/components/TextField";
import ButtonForForm from "@/components/ButtonForForm";
import validationAuth from "@/helper/validationAuth";
import styles from "./auth.module.css";

const AuthPage = () => {
  const [authInput, setAuthInput] = useState({
    email: "Email",
    password: "",
  });

  const [error, setError] = useState("");

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

  const validationResult = validationAuth(authInput.email);

  const handleBlur = (): void => {
    if (validationResult === false) {
      setError("Не валидный email");
    }
  };

  return (
    <div className={styles.container} style={{ marginBottom: "200px" }}>
      <div></div>
      <form>
        <div>
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
          <span className="helper-text"></span>
        </div>
        <ButtonForForm text={'войти'}/>
      </form>
      <div></div>
    </div>
  );
};

export default AuthPage;
