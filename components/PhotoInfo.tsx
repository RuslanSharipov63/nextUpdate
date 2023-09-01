"use client"
import { FC, useState } from "react";
import Button from "./Button";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import ModalWindow from "./ModalWindow";
import { changePush } from "@/store/PushSlice";
import { changeDisabledButton } from "@/store/ButtonSlice";
import {
    tagsStoreChange,
    priceStoreChange,
    idStore,
} from "@/store/ChangeInputSlice";
import { fetchDeletePhoto } from "@/store/DeletePhotoSlice";
import { fetchDeletePhotoFromDir } from "@/store/DeletePhotoSliceFromDir";

type PhotoInfoProps = {
    user: string;
    tags: string;
    size: number;
    price: number;
    valueForButton?: string[];
    createdAt: string;
    imageURL: string;
}

const PhotoInfo: FC<PhotoInfoProps> = ({
    user,
    tags,
    size,
    price,
    valueForButton,
    createdAt,
    imageURL
}) => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { disabledValueDelete } = useAppSelector((state) => state.ButtonSlice);
    const [stateModalWindow, setModalWindow] = useState(false);


    const funcEditPhoto = () => {
        dispatch(tagsStoreChange(tags));
        dispatch(priceStoreChange(price.toString()));
        dispatch(idStore(params.id));
        setModalWindow(true);
    };

    const closeModalWindow = () => {
        setModalWindow(false);
        dispatch(changePush("update"));
    };

    const funcForStatePushAfterDelete = () => {
        dispatch(changePush("delete"));
    };

    const funcDeletePhoto = async () => {
        await dispatch(changeDisabledButton("disabledValueDelete"));
        await dispatch(fetchDeletePhotoFromDir(imageURL));
        await dispatch(fetchDeletePhoto(params.id));
        await funcForStatePushAfterDelete?.();
        await dispatch(changeDisabledButton("disabledValueDelete"));
    };

    const t = createdAt.indexOf("T");
    const dateCreatePhoto = createdAt.slice(0, t);

    return (
        <>
            {stateModalWindow && <ModalWindow closeModalWindow={closeModalWindow} />}
            <div className="card-content">
                <span className="card-title">фото: {user}</span >
                <p>теги: {tags}</p>
                <p>размер: {(size / 1024 / 1024).toFixed(2)} мб</p>
                <p>цена: {price ? price + " руб" : "бесплатно"}</p>
                <p>дата создания: {dateCreatePhoto}</p>
            </div >
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
            )}
        </>
    );
}

export default PhotoInfo;