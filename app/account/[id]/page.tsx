"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { fetchPhotosAuthor } from "@/store/PhotosAuthorSlice";
import { fetchUploadPhoto } from "@/store/UploadPhotoSlice";
import { fetchAuthMe } from "@/store/AuthMeSlice";
import Button from "@/components/Button";
import styles from "./Account.module.css";
import TextFieldUploads from "@/components/TextFieldUploads";
import TextField from "@/components/TextField";
import InfoImage from "@/components/InfoImage";
import HelperText from "@/components/HelperText";
import LabelText from "@/components/LabelText";
import Title from "@/components/Title";
import PhotoList from "@/components/PhotoList";
import { fetchAddPhoto } from "@/store/AddPhotoSlice";
import Loader from "@/components/Loader";
import PushComponent from "@/components/PushComponent";
import { IinitialStateList } from "@/types/type";
import { valueForButton } from "@/valueForButton";
import { checkTags } from "@/helper/CheckTags";
import ModalWindow from "@/components/ModalWindow";
import { arrForEditPhotoType } from "@/types/type";
import ProfileCardContainer from "@/components/ProfileCardContainer";
import {
  tagsStoreChange,
  priceStoreChange,
  handleStoreFocus,
  setTagsError,
  setPriceError,
  idStore,
} from "@/store/ChangeInputSlice";
import { checkPrice } from "@/helper/CheckPrice";
import { changeDisabledButton } from "@/store/ButtonSlice";
import { changePush } from "@/store/PushSlice";

type newArrPhotoType = {
  imageURL: string;
  tags: string;
  user: string;
  size: number;
  price?: number;
};
const AccountPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { userData, loading } = useAppSelector((state) => state.AuthMeSlice);
  const { list } = useAppSelector((state) => state.PhotosAuthorSlice);
  const { fileURL } = useAppSelector((state) => state.UploadPhotoSlice);
  const { id, tagsStore, priceStore, errorPriceStore, errorTagsStore } =
    useAppSelector((state) => state.ChangeInputSlice);
  const { disabledValueUpload } = useAppSelector((state) => state.ButtonSlice);
  const { pushBol, message } = useAppSelector((state) => state.PushSlice);

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [error, setError] = useState({
    fileUpload: "",
  });
  const [preView, setPreView] = useState("");
  const [listState, setListState] = useState<IinitialStateList[]>([]);
  const [stateModalWindow, setModalWindow] = useState(false);

  useEffect(() => {
    dispatch(fetchPhotosAuthor(params.id));
    dispatch(fetchAuthMe());  
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      setListState(list);
      return;
    }
  }, [list]);

  const funcForStatePushAfterDelete = () => {
    dispatch(changePush("delete"));
  };

  useEffect(() => {
    if (pushBol) {
      dispatch(fetchPhotosAuthor(params.id));
      return;
    }
  }, [pushBol]);

  const tagsChange = (value: string) => {
    dispatch(tagsStoreChange(value));
  };

  const handleChange = (e: any) => {
    setSelectedFile(null);
    setSelectedFile(e.target.files[0]);
    setError({ ...error, fileUpload: "" });
    dispatch(setPriceError(""));
    setPreView(URL.createObjectURL(e.target.files[0]));
  };

  const priceChange = (item: string) => {
    if (!checkTags(tagsStore)) {
      dispatch(
        setTagsError("Введите теги через пробел. Тег больше одного символа")
      );
      return;
    }
    if (checkPrice(item) === true || item === "") {
      dispatch(priceStoreChange(item));
      dispatch(setPriceError(""));
    }
    if (checkPrice(item) === false) {
      dispatch(setPriceError("введите число"));
    }
  };

  const handleFocus = () => {
    dispatch(handleStoreFocus());
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setError({ ...error, fileUpload: "Выберите файл" });
      return;
    }

    if (!checkTags(tagsStore)) {
      dispatch(
        setTagsError("Введите теги через пробел. Тег больше одного символа")
      );
      return;
    }
    dispatch(changeDisabledButton("disabledValueUpload"));
    dispatch(fetchUploadPhoto(selectedFile));
  };

  useEffect(() => {
    const fileUrl = fileURL.fileUrl;
    if (fileURL.fileURL != "") {
      const { size } = selectedFile;
      let newArrPhoto: newArrPhotoType = {
        imageURL: fileUrl,
        tags: tagsStore,
        user: params.id,
        size,
        price: Number(priceStore),
      };
      const addPhoto = async () => {
        await dispatch(fetchAddPhoto(newArrPhoto));
        await setSelectedFile(null);
        await dispatch(tagsStoreChange(""));
        await dispatch(priceStoreChange(""));
        await dispatch(changePush("add"));
      };
      addPhoto();
      return;
    }
  }, [fileURL]);

  const checkUserDataMessage = () => {
    if ("message" in userData) push("/auth");
    return;
  };
  const closePushComponent = () => {
    dispatch(changePush(null));
    dispatch(changeDisabledButton(null));
  };

  const editPhoto = (arrForEditPhoto: arrForEditPhotoType): void => {
    dispatch(tagsStoreChange(arrForEditPhoto.tags));
    dispatch(priceStoreChange(arrForEditPhoto.price.toString()));
    dispatch(idStore(arrForEditPhoto.id));
    setModalWindow(true);
  };

  const closeModalWindow = () => {
    setModalWindow(false);
    dispatch(changePush("update"));
  };
  return (
    <>

      <PushComponent
        text={message}
        stateValue={pushBol}
        closePushComponent={closePushComponent}
      />
      {checkUserDataMessage()}
      {stateModalWindow && <ModalWindow closeModalWindow={closeModalWindow} />}
      <div className={styles.container}>
        <ProfileCardContainer
          userData={userData}
          loading={loading}
          photolistuathorcount={list.length}
        />
        <div className={`${styles.formContainer} z-depth-2`}>

          <LabelText text={"Загрузите файл"} />
          <TextFieldUploads typeText={"file"} funcChange={handleChange} />
          <HelperText text={error.fileUpload} />
          <LabelText text={"Введите теги через пробел"} />
          <TextField
            typeText={"text"}
            valueText={tagsStore}
            funcChange={tagsChange}
            funcFocus={handleFocus}
            nameText="теги"
            idText={"теги"}
          />
          <HelperText text={errorTagsStore} />
          <LabelText text={"Цена"} />
          <TextField
            typeText={"text"}
            valueText={priceStore}
            funcChange={priceChange}
            nameText="цена"
            idText={"цена"}
          />
          <HelperText text={errorPriceStore} />
          <Button
            text="загрузить"
            funcClick={handleUpload}
            disabled={disabledValueUpload}
          />
          {disabledValueUpload && <Loader />}
        </div>
        {selectedFile && <InfoImage info={selectedFile} preView={preView} />}
      </div>

      <Title text={"Мои фотографии"} />
      {listState.length === 0 ? (
        <Title text={"Вы пока не загружали фотографии"} />
      ) : (
        listState.map(
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
              valueForButton={valueForButton}
              funcForStatePushAfterDelete={funcForStatePushAfterDelete}
              editPhoto={editPhoto}
            />
          )
        )
      )}
    </>
  );
};

export default AccountPage;
