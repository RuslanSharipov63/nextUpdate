import Link from "next/link";

const Footer = () => {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">(Название)</h5>
              <p className="grey-text text-lighten-4">Бесплатный фотосток. Все фотографии можно использовать без ограничений. Региструясь и размещая фото на этом ресурсе вы автоматически принимаете эти условия.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">меню</h5>
              <ul>
                <li><Link className="grey-text text-lighten-3" href="/">Главная</Link></li>
                <li><Link className="grey-text text-lighten-3" href="/about">О проекте</Link></li>
                <li><Link className="grey-text text-lighten-3" href="/contacts">Контакты</Link></li>
                <li><Link className="grey-text text-lighten-3" href="/profile">Профиль</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2023 Copyright Ruslan Sharipov
            {/* <Link className="grey-text text-lighten-4 right" href="#!">More Links</Link> */}
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;