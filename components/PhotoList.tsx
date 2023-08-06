import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

import style from "./../stylescomponent/PhotoList.module.css";
import Button from "./Button";

/* import s from './../back/uploads/' */

type PhotoListProps = {
  id: string;
  imageURL: string;
  tags: string;
  size: number;
  user: string;
  price?: number;
  createdAt: string;
  textForButton?: string
};

const PhotoList: FC<PhotoListProps> = ({
  id,
  imageURL,
  tags,
  size,
  user,
  price,
  createdAt,
  textForButton
}) => {

  const funcDeletePhoto = () => {
    alert('Фото удалено')
  }
  const t = createdAt.indexOf("T");
  const dateCreatePhoto = createdAt.slice(0, t);

  return (
    <div className={style.container}>
      <div className="card">
        <div className="card-image">
          <Link href={`/photo/${id}`}>
            <Image
              src={`${imageURL}`}
              width={200}
              height={300}
              alt="картинка"
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </Link>

        </div>
        <div className="card-content">
          <span className="card-title">фото: {user}</span>
          <p>теги: {tags}</p>
          <p>размер: {(size / 1024 / 1024).toFixed(2)} мб</p>
          <p>цена: {price ? price + ' руб' : 'бесплатно'}</p>
          <p>дата создания: {dateCreatePhoto}</p>
          </div>
        {textForButton &&
          <div className="card-action">
            <Button text={textForButton && textForButton} funcClick={funcDeletePhoto} />
          </div>}
      </div>
    </div>
  );
};

export default PhotoList;
