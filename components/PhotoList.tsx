import Image from "next/image";
import { FC } from "react";
import style from "./../stylescomponent/PhotoList.module.css";
import Button from "./Button";

import err from './../back/uploads'

import { IinitialStateList } from "@/store/PhotoListSlice";

type PhotoListProps = {
  list: IinitialStateList[]
}

const PhotoList: FC<PhotoListProps> = ({ list }) => {
  const funcDeletePhoto = () => {
    alert("Фото удалено");
  };

  return (

    <div className={style.container}>
      {list.map((item: any) =>
        <div className="card" key={item._id}>
          <div className="card-image">
            <Image
              src={`/../back/uploads/${item.imageURL}`}
              width={200}
              height={300}
              alt="картинка"
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>
              {item.tags.join(' ')}
            </p>
            <p>
              {item.size} мб
            </p>
          </div>
          <div className="card-action">
            <Button text={"удалить"} funcClick={funcDeletePhoto} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoList;
