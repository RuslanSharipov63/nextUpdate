import { FC } from "react";
import style from './../stylescomponent/Title.module.css'


type TitleProps = {
    text: string;
}
const Title: FC<TitleProps> = ({ text }) => {
    return (
        <h3 className={style.title}>{text}</h3>
    );
}

export default Title;