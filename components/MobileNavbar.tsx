import Link from "next/link";
import { FC } from "react";
import styles from "./../stylescomponent/MobileNavbar.module.css";

type MobileNavbarProps = {
  closeMobileMenu: () => void;
  openSearch: () => void;
}

const MobileNavbar: FC<MobileNavbarProps> = ({closeMobileMenu, openSearch}) => {
  return (
    <div className={styles.wrapperContainerMobileMenu}>
      <div className={styles.containerMobileMenu}>
        <div>
          <Link href="/" className={styles.link}>Главная</Link>
        </div>
        <div>
          <Link href="#" className={styles.link}>О проекте</Link>
        </div>
        <div>
          <Link href="#" className={styles.link}>Контакты</Link>
        </div>
        <div>
          <Link href="/" className={styles.link}>Профиль</Link>
        </div>
        <div>
          <Link href="/auth" className={styles.link}>Войти</Link>
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
