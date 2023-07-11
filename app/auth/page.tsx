"use client";
import { useState } from "react";
import TextField from "@/components/TextField";
import validationAuth from "@/helper/validationAuth";
import styles from './auth.module.css';

const AuthPage = () => {
  const [authInut, setAuthInput] = useState({
    email: "Email",
    password: "",
  });

  const [error, setError] = useState({
    email: '',
    password: ''
  })

  const handleChange = (etv: string, etn: string) => {
    setAuthInput({
      ...authInut,
      [etn]: etv,
    });
  };
  const handleFocus = (etn: string) => {
    setAuthInput({
      ...authInut,
      [etn]: "",
    });
  };

  const validationResult = validationAuth(authInut.email, authInut.password)

  const handleBlur = (): void => {
  
    if (validationResult === 1) {
      setError({ ...error, email: "Не валидный email" })
    }
    if (validationResult === 2) {
      setError({ ...error, password: "Длина пароля от 5 до 8 символов" })
    }
    console.log(validationResult)
  }

  

  return (
    <div className={styles.container} style={{ marginBottom: '200px' }}>
      <div></div>
      <form>
        <div>
          <label htmlFor="email">Электронная почта</label>
          <span className="helper-text">{error.email === "" ? null : error.email}</span>
          <TextField
            typeText={"text"}
            valueText={authInut.email}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="email"
            idText={'email'}
            funcBlur={handleBlur}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <span className="helper-text">{error.password === "" ? null : error.password}</span>
          <TextField
            typeText={"password"}
            valueText={authInut.password}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="password"
            idText={'pass'}
            funcBlur={handleBlur}
          />
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default AuthPage;
