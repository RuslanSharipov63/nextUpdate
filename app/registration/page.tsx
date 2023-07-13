"use client"
import { useState } from "react";
import { validationEmail, validationPassword, validationFirstName } from "@/helper/validation";
import TextField from "@/components/TextField";


type stateProps = {
  [x: string]: string;
}


const RegistrationPage = () => {
  const [registerInput, setRegisterInput] = useState<stateProps>({
    email: "Email",
    password: "",
    firstName: "имя",
  });
  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [checkEmailPass, setCheckEmailPass] = useState(true);

  const handleChange = (etv: string, etn: string) => {
    setRegisterInput({
      ...registerInput,
      [etn]: etv,
    });
    setError({ ...error, firstName: "", email: "", password: "" });
    setCheckEmailPass(true);
  };
  const handleFocus = (etn: string) => {
    setRegisterInput({
      ...registerInput,
      [etn]: "",
    });
  };

  const handleBlur = (etn: string): void => {
    if (etn === 'email') {
      if (validationEmail(registerInput.etn) === false) {
        setError({ ...error, [etn]: "Не валидный email" });
      }
    }

    if (etn === 'password') {
      if (validationPassword(registerInput.etn) === false) {
        setError({ ...error, [etn]: "Пароль от 5 до 8 символов" });
      }
    }

    if (etn === 'firstName') {
      if (validationFirstName(registerInput.etn) === false) {
        setError({ ...error, [etn]: "Имя от 3 до 10 символов" });
      }
    }

  };
  return (
    <>
      <p>
        <label htmlFor="firstname">Имя</label>
      </p>
      <TextField
        typeText={"text"}
        valueText={registerInput.firstName}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="firstName"
        idText={"firstname"}
        funcBlur={handleBlur}
      />
      <span className="helper-text">{error.firstName === "" ? null : error.firstName}</span>
      <label htmlFor="email">Электронная почта</label>
      <TextField
        typeText={"text"}
        valueText={registerInput.email}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="email"
        idText={"email"}
        funcBlur={handleBlur}
      />
      <span className="helper-text">{error.email === "" ? null : error.email}</span>
      <p>
        <label htmlFor="password">Пароль</label>
      </p>
      <TextField
        typeText={"password"}
        valueText={registerInput.password}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="password"
        idText={"pass"}
        funcBlur={handleBlur}
      />
      <span className="helper-text">{error.password === "" ? null : error.password}</span>
    </>
  );
};

export default RegistrationPage;
