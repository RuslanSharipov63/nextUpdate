import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { fetchDeletePhoto } from "@/store/DeletePhotoSlice";
import { fetchDeletePhotoFromDir } from "@/store/DeletePhotoSliceFromDir";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Button from "./Button";
import { arrForEditPhotoType } from "@/types/type";
import { changeDisabledButton } from "@/store/ButtonSlice";

type PhotoListProps = {
   id: string;
  imageURL: string;
  tags: string;
  size: number;
  user: string;
  price: number;
  createdAt: string;
  textForButton?: string;
  valueForButton?: string[];
  funcForStatePushAfterDelete?: () => void;
  editPhoto?: (arrForEditPhoto: arrForEditPhotoType) => void;
};

const PhotoList: FC<PhotoListProps> = ({
  id,
  imageURL,
  tags,
  size,
  user,
  price,
  createdAt,
  valueForButton,
  funcForStatePushAfterDelete,
  editPhoto,
  textForButton,

}) => {
  const dispatch = useAppDispatch();
  const { disabledValueDelete } = useAppSelector((state) => state.ButtonSlice);

  /* const funcDeletePhoto = async () => {
    await dispatch(changeDisabledButton("disabledValueDelete"));
    await dispatch(fetchDeletePhotoFromDir(imageURL));
    await dispatch(fetchDeletePhoto(id));
    await funcForStatePushAfterDelete?.();
    await dispatch(changeDisabledButton("disabledValueDelete"));
  }; */

  /* const funcEditPhoto = () => {
    const arrForEditPhoto: arrForEditPhotoType = {
      id,
      tags,
      price: price,
    };
    editPhoto?.(arrForEditPhoto);
  }; */
 /*  const t = createdAt.indexOf("T");
  const dateCreatePhoto = createdAt.slice(0, t); */

  return (
    <div key={id}>
      <div className="card-image">
        <Link href={`/photo/${id}`}>
          <Image
            src={`${imageURL}`}
            width={300}
            height={300}
            alt="картинка"
            priority={true}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </Link>
      </div>
  {/*     <div className="card-content">
        <span className="card-title">фото: {user}</span>
        <p>теги: {tags}</p>
        <p>размер: {(size / 1024 / 1024).toFixed(2)} мб</p>
        <p>цена: {price ? price + " руб" : "бесплатно"}</p>
        <p>дата создания: {dateCreatePhoto}</p>
      </div>
      {valueForButton && (
        <div className="card-action">
          <Button
            text={valueForButton[0] && valueForButton[0]}
            funcClick={funcDeletePhoto}
            disabled={disabledValueDelete}
          />
          <Button
            text={valueForButton[3] && valueForButton[3]}
            funcClick={funcEditPhoto}
          />
        </div>
      )} */}
    </div>
  );
};

export default PhotoList;
