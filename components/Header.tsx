"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isToken } from "@/store/AuthMeSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import Link from "next/link";

const Header = () => {
  const { push } = useRouter();
  const { token } = useAppSelector(state => state.AuthMeSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isToken())
  }, [token])


  const clearToken = () => {
    localStorage.clear();
    dispatch(isToken())
    push('/auth')
  }

  return (
    <header style={{ marginBottom: "50px" }}>
      <nav>
        <div className="nav-wrapper">
          <Link href="/" className="brand-logo">
            Logo
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <input
                placeholder="поиск"
                type="text"
                style={{ color: "white", border: "none" }}
              />
            </li>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href="badges.html">О проекте</Link>
            </li>
            <li>
              <Link href="collapsible.html">Контакты</Link>
            </li>
            <li>
              <Link href="/profile">Профиль</Link>
            </li>
            <li>
              <Link href="/auth" onClick={clearToken}>{token ? "выйти" : "войти"}</Link>
            </li>
            <li>
              <Link href="/registration">регистрация</Link>
            </li>
          </ul>
        </div>
        <div className="nav-wrapper"></div>
      </nav>
    </header>
  );
};

export default Header;
