import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

import style from "./../stylescomponent/PhotoList.module.css";
import Button from "./Button";

type PhotoListProps = {
  id: string;
  imageURL: string;
  tags: string[];
  size: number;
  user: string;
  createdAt: string;
};

const PhotoList: FC<PhotoListProps> = ({
  id,
  imageURL,
  tags,
  size,
  user,
  createdAt,
}) => {
  const funcDeletePhoto = () => {
    alert("Фото удалено");
  };

  const t = createdAt.indexOf("T");
  const dateCreatePhoto = createdAt.slice(0, t);

  return (
    <div className={style.container}>
      <div className="card">
        <div className="card-image">
          <Link href={`/photo/${id}`}>
            <Image
              src="/../public/image/photo/s1200.jpg"
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
          <p>теги: {tags.join(" ")}</p>
          <p>размер: {size} мб</p>
          <p>дата создания: {dateCreatePhoto}</p>
        </div>
        <div className="card-action">
          <Button text={"удалить"} funcClick={funcDeletePhoto} />
        </div>
      </div>
    </div>
  );
};

export default PhotoList;
