"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PhotoList from "@/components/PhotoList";
import OnePhoto from "@/components/OnePhoto";
import Title from "@/components/Title";
import { fetchPhoto } from "@/store/PhotoSlice";
import { fetchPhotosAuthor } from "@/store/PhotosAuthorSlice";
import Loader from "@/components/Loader";
import PhotoInfo from "@/components/PhotoInfo";
import StatusTextForServer from "@/components/StatusTextFoServer";
import { valueForButton } from "@/valueForButton";
import styles from "./OnePhotoUser.module.css";
import ModalWindow from "@/components/ModalWindow";
import {
  tagsStoreChange,
  priceStoreChange,
  idStore,
} from "@/store/ChangeInputSlice";
import Button from "@/components/Button";
import { changeDisabledButton } from "@/store/ButtonSlice";
import { fetchDeletePhoto } from "@/store/DeletePhotoSlice";
import { fetchDeletePhotoFromDir } from "@/store/DeletePhotoSliceFromDir";
import { changePush } from "@/store/PushSlice";
import PushComponent from "@/components/PushComponent";
import { isToken } from "@/store/AuthMeSlice";

const Photo = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [stateModalWindow, setModalWindow] = useState(false);
  const { list, loading } = useAppSelector((state) => state.PhotoSlice);
  const photosAuthor = useAppSelector((state) => state.PhotosAuthorSlice);
  const { disabledValueDelete } = useAppSelector((state) => state.ButtonSlice);
  const { success } = useAppSelector((state) => state.UpdatePhotoSlice);
  const { pushBol, message } = useAppSelector((state) => state.PushSlice);
  const { token } = useAppSelector(state => state.AuthMeSlice)

  useEffect(() => {
    dispatch(fetchPhoto(params.id));
    dispatch(isToken())
  }, []);

  useEffect(() => {
    dispatch(fetchPhotosAuthor(list[0].user._id));
  }, []);

  useEffect(() => {
    if (success.success) {
      dispatch(fetchPhoto(params.id));
    }
  }, [success.success]);

  const funcEditPhoto = () => {
    dispatch(tagsStoreChange(list[0].tags));
    dispatch(priceStoreChange(list[0].price.toString()));
    dispatch(idStore(params.id));
    setModalWindow(true);
  };

  const funcDeletePhoto = async () => {
    await dispatch(changeDisabledButton("disabledValueDelete"));
    await dispatch(fetchDeletePhotoFromDir(list[0].imageURL));
    await dispatch(fetchDeletePhoto(params.id));
    await funcForStatePushAfterDelete?.();
    await dispatch(changeDisabledButton("disabledValueDelete"));
  };
  const funcForStatePushAfterDelete = () => {
    dispatch(changePush("delete"));
  };
  const closeModalWindow = () => {
    setModalWindow(false);
  };
  const closePushComponent = () => {
    dispatch(changePush(null));
    dispatch(changeDisabledButton(null));
    dispatch(fetchPhoto(params.id));
  };
  return (
    <>
      <PushComponent
        text={message}
        stateValue={pushBol}
        closePushComponent={closePushComponent}
      />
      {stateModalWindow && <ModalWindow closeModalWindow={closeModalWindow} />}
      {loading === "pending" && <Loader />}
      {loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
      <div className={styles.containerOnePhoto}>
        {loading === "fulfilled" && (
          <>
            <OnePhoto id={list[0]._id} imageURL={list[0].imageURL} />
            <div className={styles.containerPhotoInfo}>
              <PhotoInfo
                user={list[0].user.fullName}
                tags={list[0].tags}
                size={list[0].size}
                price={list[0].price}
                valueForButton={valueForButton}
                createdAt={list[0].createdAt}
              />
              {token ? (
                <div className={`${styles.buttonCardAction} card-action`}>
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
              ) :
                <div className={`${styles.buttonCardAction} card-action`}>
                  <Button
                    text={valueForButton[5] && valueForButton[5]}
                    funcClick={funcDeletePhoto}
                    /* потом поменять здесь кнопка купить а не удалить */
                    disabled={disabledValueDelete}
                  />
                </div>
              }
            </div>
          </>
        )}
      </div>
      <Title text={"Другие фото автора"} />
      {photosAuthor.loading === "pending" && <Loader />}
      {photosAuthor.loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
      <div className={styles.containerPhotoList}>
        {loading === "fulfilled" &&
          photosAuthor.list.map(
            (item: {
              _id: string;
              imageURL: string;
              tags: string;
              size: number;
              price: number;
              user: { fullName: string };
              createdAt: string;
            }) => (
              <PhotoList
                key={item._id}
                id={item._id}
                imageURL={item.imageURL}
                tags={item.tags}
                size={item.size}
                price={item.price}
                user={item.user.fullName}
                createdAt={item.createdAt}
              />
            )
          )}
      </div>
    </>
  );
};

export default Photo;
