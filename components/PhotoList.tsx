import Image from "next/image";
import { FC } from "react";
import style from "./../stylescomponent/PhotoList.module.css";
import Button from "./Button";
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
              src={`/../public/image/photo/s1200.jpg`}
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
              теги: {item.tags.join(' ')}
            </p>
            <p>
              размер: {item.size} мб
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
