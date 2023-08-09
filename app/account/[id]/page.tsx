"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { fetchPhotosAuthor } from "@/store/PhotosAuthorSlice";
import { fetchUploadPhoto } from "@/store/UploadPhotoSlice";
import { fetchAuthMe } from "@/store/AuthMeSlice";
import Button from "@/components/Button";
import styles from "./Account.module.css";
import ProfileCard from "@/components/ProfileCard";
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
import { checkTags } from "@/helper/checkTags";
const regValue = /^[0-9A-ZА-ЯЁ]+$/i;
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
  const { succes } = useAppSelector((state) => state.DeletePhotoSlice)
  const { fileURL } = useAppSelector((state) => state.UploadPhotoSlice);
  const photo = useAppSelector((state) => state.AddPhotoSlice);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({
    fileUpload: "",
    tags: "",
    price: "",
  });
  const [preView, setPreView] = useState("");
  const [statePush, setStatePush] = useState({
    pushBol: false,
    message: ''
  });
  const [stateDisabled, setStateDisabled] = useState(false);
  const [listState, setListState] = useState<IinitialStateList[]>([]);


  useEffect(() => {
    dispatch(fetchPhotosAuthor(params.id));
    dispatch(fetchAuthMe());
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      setListState(list)
      return;
    }
  }, [list])

  const funcForStatePushAfterDelete = () => {
    setStatePush({ ...statePush, pushBol: true, message: 'фото удалено' })
  }

  useEffect(() => {
    if (statePush.pushBol) {
      dispatch(fetchPhotosAuthor(params.id));
      return;
    }
  }, [statePush.pushBol])

  const handleChange = (e: any) => {
    setSelectedFile(null);
    setSelectedFile(e.target.files[0]);
    setError({ ...error, fileUpload: "", tags: "" });
    setPreView(URL.createObjectURL(e.target.files[0]));
  };

  const tagsChange = (e: string) => {
    setTags(e);
    setError({ ...error, fileUpload: "", tags: "" });
  };

  const priceChange = async (e: string) => {
    const regPrice = await /^\d+?$/;
    if (regPrice.test(e)) {
      setError({ ...error, price: "" });
      setPrice(e);
      return;
    } else {
      setError({ ...error, price: "Введите число" });
      setPrice("");
    }
  };

  const handleFocus = () => {
    setTags("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setError({ ...error, fileUpload: "Выберите файл" });
      return;
    }

    if (!checkTags(tags)) {
      setError({
        ...error,
        tags: "Введите теги через пробел. Тег больше одного символа",
      });
      return;
    }
    setStateDisabled(true);
    dispatch(fetchUploadPhoto(selectedFile));
  };

  useEffect(() => {
    const fileUrl = fileURL.fileUrl;
    if (fileURL.fileURL != "") {
      const { size } = selectedFile;
      let newArrPhoto: newArrPhotoType = {
        imageURL: fileUrl,
        tags: tags,
        user: params.id,
        size,
        price: Number(price),
      };
      dispatch(fetchAddPhoto(newArrPhoto));
      setSelectedFile(null);
      setTags("");
      setPrice("");
      setStatePush({ ...statePush, pushBol: true, message: 'фото добавлено' });
      return;
    }
  }, [fileURL]);


  const checkUserDataMessage = () => {
    if ("message" in userData) push("/auth");
    return;
  };
  const closePushComponent = () => {
    setStatePush({ ...statePush, pushBol: false, message: '' });
    setStateDisabled(false);
  };


  return (
    <>
      <PushComponent
        text={statePush.message}
        stateValue={statePush.pushBol}
        closePushComponent={closePushComponent}
      />
      {checkUserDataMessage()}

      <div className={styles.container}>
        <ProfileCard
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
            valueText={tags}
            funcChange={tagsChange}
            funcFocus={handleFocus}
            nameText="теги"
            idText={"теги"}
          />
          <HelperText text={error.tags} />
          <LabelText text={"Цена"} />
          <TextField
            typeText={"text"}
            valueText={price}
            funcChange={priceChange}
            nameText="цена"
            idText={"цена"}
          />
          <HelperText text={error.price} />
          <Button
            text="загрузить"
            funcClick={handleUpload}
            disabled={stateDisabled}
          />
          {stateDisabled && <Loader />}
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
            />
          )
        )
      )}
    </>
  );
};

export default AccountPage;
