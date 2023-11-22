"use client"
import Link from "next/link";
import { isToken } from "@/store/AuthMeSlice";
import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import styles from "./../stylescomponent/MobileNavbar.module.css";
import { useRouter } from "next/navigation";

type MobileNavbarProps = {
  closeMobileMenu: () => void;
  openSearch: () => void;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ closeMobileMenu, openSearch }) => {
  const { token } = useAppSelector((state) => state.AuthMeSlice);
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  
  useEffect(() => {
    dispatch(isToken());
  }, [token]);

  const clearToken = () => {
    localStorage.clear();
    dispatch(isToken());
    push("/auth");
  };
  return (
    <div className={styles.wrapperContainerMobileMenu}>
      <div className={styles.containerMobileMenu}>
        <div>
          <Link href="/" className={styles.link}>Главная</Link>
        </div>
        <div>
          <Link href="/about" className={styles.link}>О проекте</Link>
        </div>
        <div>
          <Link href="/contacts" className={styles.link}>Контакты</Link>
        </div>
        <div>
          <Link href="/profile" className={styles.link}>Профиль</Link>
        </div>
        <div>
          <Link href="/auth" className={styles.link} onClick={clearToken}>{token ? "выйти" : "войти"}</Link>
        </div>
        <div>
          <Link href="/registration" className={styles.link}>Регистрация</Link>
        </div>
        <div>
          <Link href="#" className={styles.link} onClick={openSearch}>поиск</Link>
        </div>
        <div onClick={closeMobileMenu}>
          закрыть
        </div>
      </div>
    </div>

  );
};

export default MobileNavbar;
