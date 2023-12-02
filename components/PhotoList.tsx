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
  /* const dispatch = useAppDispatch(); */
/*   const { disabledValueDelete } = useAppSelector((state) => state.ButtonSlice); */

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
            blurDataURL={`${imageURL}`}
            loading="lazy"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </Link>
      </div>
 
    </div>
  );
};

export default PhotoList;
