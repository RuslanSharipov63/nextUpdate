import Link from "next/link";
export default function ContactsPage() {
    return (
        <div className="row">
            <div className="col l4 m6 s12">
                <p>Контакты</p>
                <ul className="collection">
                    <li className="collection-item card-panel teal lighten-2"><Link href="mailto:sharipov.r@mail.ru" style={{textDecoration: 'none',color: 'black'}}>email: sharipov.r@mail.ru</Link></li>
                    <li className="collection-item card-panel teal lighten-2" ><Link href="https://t.me/ @r9u9s9" style={{textDecoration: 'none',color: 'black'}}>tg: @r9u9s9</Link></li>
                </ul>
            </div>
        </div>
    );
}