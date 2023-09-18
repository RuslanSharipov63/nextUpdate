"use client";
import { useEffect, useState } from "react";
import { tagsSearchChange } from "@/store/ChangeInputSlice";
import { useRouter } from "next/navigation";
import { isToken } from "@/store/AuthMeSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import styles from "./../stylescomponent/Header.module.css";




const Header = () => {
  const { push } = useRouter();
  const { token } = useAppSelector((state) => state.AuthMeSlice);
  const { searchtags } = useAppSelector((state) => state.ChangeInputSlice);

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    dispatch(isToken());
  }, [token]);


  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    console.log(windowWidth)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);


  const funcRed = (e: any) => {
    if (e.key === "Enter" && searchtags != "") {
      push(`/search/${searchtags}`);
    }
  };

  const clearToken = () => {
    localStorage.clear();
    dispatch(isToken());
    push("/auth");
  };

  const searchPhoto = () => {
    if (searchtags != "") {
      push(`/search/${searchtags}`);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tagsSearchChange(e.target.value));
  };
  return (
    <header style={{ marginBottom: "50px" }}>

      {/*  <nav>

        <div className="nav-wrapper">
          <Link href="/" className="brand-logo">
            Logo
          </Link>
          <ul id="nav-mobile"
            className="right hide-on-med-and-down">
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
              <Link href="/auth" onClick={clearToken}>
                {token ? "выйти" : "войти"}
              </Link>
            </li>
            <li>
              <Link href="/registration">регистрация</Link>
            </li>
            <li>
              <Link href="#" onClick={() => setSearch(true)}>
                поиск
              </Link>
            </li>
          </ul>
        </div>
      </nav> */}

      {mobileMenu && <MobileNavbar />}




      {/* {search && (
        <nav>
          <div className="nav-wrapper">
            <div className="input-field">
              <input
                id="search"
                type="search"
                required
                onChange={handleChange}
                value={searchtags}
                onKeyDown={(e) => funcRed(e)}
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons" onClick={searchPhoto}>
                  search
                </i>
              </label>
              <i className="material-icons" onClick={() => setSearch(false)}>
                close
              </i>
            </div>
          </div>
        </nav> 
      )}*/}




      <nav>
        <div className="nav-wrapper">
          <Link href="#!" className="brand-logo">Logo</Link>
          <Link href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down" >
            <li><Link href="/">Главная</Link></li>
            <li><Link href="badges.html">О проекте</Link></li>
            <li><Link href="/contacts">Контакты</Link></li>
            <li><Link href="/profile">Профиль</Link></li>
            <li>
              <Link href="/auth" onClick={clearToken}>
                {token ? "выйти" : "войти"}
              </Link>
            </li>
            <li><Link href="/registration">регистрация</Link></li>
            <li><Link href="#" onClick={() => setSearch(true)}>поиск</Link></li>
          </ul>
        </div>
      </nav>


      {search &&
        <nav>
          <div className="nav-wrapper">
            <div className="input-field">
              <input
                id="search"
                type="search"
                required
                onChange={handleChange}
                value={searchtags}
                onKeyDown={(e) => funcRed(e)}
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons" onClick={searchPhoto}>
                  search
                </i>
              </label>
              <i className="material-icons" onClick={() => setSearch(false)}>
                close
              </i>
            </div>
          </div>
        </nav>}



      <ul className="sidenav" id="mobile-demo">
        <li><Link href="/">Главная</Link></li>
        <li><Link href="badges.html">О проекте</Link></li>
        <li><Link href="collapsible.html">Контакты</Link></li>
        <li><Link href="/profile">Профиль</Link></li>
        <li><Link href="/auth" onClick={clearToken}>
          {token ? "выйти" : "войти"}
        </Link></li>
        <li><Link href="/registration">регистрация</Link></li>
        <li><Link href="#" onClick={() => setSearch(true)}>поиск</Link></li>
      </ul>

    </header>
  );
};

export default Header;



/* {windowWidth <= 992 ? <i
  className={`${styles.headericon} medium material-icons`}
  onClick={() => setMobileMenu(true)}
>
  menu
</i>
  : null} */