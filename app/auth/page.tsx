"use client";
import { useState } from "react";
import TextField from "@/components/TextField";

const AuthPage = () => {
  const [authInut, setAuthInput] = useState({
    email: "Введите email",
    password: "Введите пароль",
  });

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
  return (
    <>
      <TextField
        typeText={"text"}
        valueText={authInut.email}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="email"
      />
      <label htmlFor="email">Email</label>
      <TextField
        typeText={"password"}
        valueText={authInut.password}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="password"
      />
    </>
  );
};

export default AuthPage;
