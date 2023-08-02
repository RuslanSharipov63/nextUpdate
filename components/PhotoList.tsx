import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

import style from "./../stylescomponent/PhotoList.module.css";
import Button from "./Button";

/* import s from './../back/uploads/' */

type PhotoListProps = {
  id: string;
  imageURL: string;
  tags: string[];
  size: number;
  user: string;
  createdAt: string;
  textForButton?: string
};

const PhotoList: FC<PhotoListProps> = ({
  id,
  imageURL,
  tags,
  size,
  user,
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
          <span className="card-title">фото: {user}</span>
        </div>
        <div className="card-content">
          <p>теги: {tags}</p>
          <p>размер: {size} мб</p>
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
