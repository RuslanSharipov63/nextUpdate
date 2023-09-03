import { FC } from "react";

type PhotoInfoProps = {
  user: string;
  tags: string;
  size: number;
  price: number;
  valueForButton?: string[];
  createdAt: string;
  imageURL: string;
};

const PhotoInfo: FC<PhotoInfoProps> = ({
  user,
  tags,
  size,
  price,
  createdAt,
}) => {

  const t = createdAt.indexOf("T");
  const dateCreatePhoto = createdAt.slice(0, t);

  return (
    <>
      <div className="card-content">
        <span className="card-title">фото: {user}</span>
        <p>теги: {tags}</p>
        <p>размер: {(size / 1024 / 1024).toFixed(2)} мб</p>
        <p>цена: {price ? price + " руб" : "бесплатно"}</p>
        <p>дата создания: {dateCreatePhoto}</p>
      </div>
     
    </>
  );
};

export default PhotoInfo;
