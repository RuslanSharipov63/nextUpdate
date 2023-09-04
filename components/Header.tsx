import Link from "next/link";
import { BASE_URL } from "@/baseValue";

async function athMe() {
  const response = await fetch(`${BASE_URL}/auth/me`)
  const data = await response.json()
  return data;
}



const Header = async () => {

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
              <Link href="/auth"></Link>
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
