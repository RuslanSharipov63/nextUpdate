import Link from "next/link";
import styles from "./../stylescomponent/MobileNavbar.module.css";

const MobileNavbar = () => {
  return (
<div className={styles.wrapperContainerMobileMenu}>
    <div className={styles.containerMobileMenu}>
      <div>
        <Link href="#" className={styles.link}>Главная</Link>
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
        <Link href="#" className={styles.link}>Войти</Link>
      </div>
      <div>
        <Link href="#" className={styles.link}>Регистрация</Link>
      </div>
      <div>
        <Link href="#" className={styles.link}>поиск</Link>
      </div>
      <div>
        закрыть
      </div>
    </div>
    </div>

  );
};

export default MobileNavbar;
