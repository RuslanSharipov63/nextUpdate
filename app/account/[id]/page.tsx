"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { fetchPhotosAuthor } from "@/store/PhotosAuthorSlice";
import { fetchUploadPhoto } from "@/store/UploadPhotoSlice";
import { fetchAuthMe } from "@/store/AuthMeSlice";
import Button from "@/components/Button";
/* import Image from "next/image";*/
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

const regValue = /^[0-9A-ZА-ЯЁ]+$/i;
type newArrPhotoType = {
  imageURL: string;
  tags: string;
  user: string;
  size: number;
  price?: number
};
const AccountPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { userData, loading } = useAppSelector((state) => state.AuthMeSlice);
  const { list } = useAppSelector((state) => state.PhotosAuthorSlice);
  const { fileURL } = useAppSelector((state) => state.UploadPhotoSlice);
  const photo = useAppSelector((state) => state.AddPhotoSlice);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState('')
  const [error, setError] = useState({
    fileUpload: "",
    tags: "",
    price: ''
  });
  const [preView, setPreView] = useState("");

  useEffect(() => {
    dispatch(fetchPhotosAuthor(params.id));
    dispatch(fetchAuthMe());
  }, []);

  const handleChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setError({ ...error, fileUpload: "", tags: "" });
    setPreView(URL.createObjectURL(e.target.files[0]));
  };

  const tagsChange = (e: string) => {
    setTags(e);
    setError({ ...error, fileUpload: "", tags: "" });
  };

  const priceChange = async (e: string) => {
    const regPrice = await /^\d+?$/
    if (regPrice.test(e)) {
      setError({ ...error, price: "" });
      setPrice(e)
      return
    } else {
      setError({ ...error, price: "Введите число" });
      setPrice('')
    }
  }

  const handleFocus = () => {
    setTags("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setError({ ...error, fileUpload: "Выберите файл" });
      return;
    }
    let tagsArr = await tags.split(" ");
    let newTagsArr = await tagsArr.filter((el) => el.search(regValue) != -1);

    if (newTagsArr.length === 0) {
      setError({
        ...error,
        tags: "Введите теги через пробел. Тег больше одного символа",
      });
      return;
    }
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
      setPrice('')
      alert('Фото успешно добавлено')
      return;
    }
  }, [fileURL]);

  const checkUserDataMessage = () => {
    if ("message" in userData) push("/auth");
    return;
  };

  return (
    <>
      {photo.loading === "pending" ? <Loader /> : null}
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
          <Button text="загрузить" funcClick={handleUpload} />
        </div>
        {selectedFile && <InfoImage info={selectedFile} preView={preView} />}
      </div>
      <Title text={"Мои фотографии"} />
      {list.length === 0 ? (
        <Title text={"Вы пока не загружали фотографии"} />
      ) : (
        list.map(
          (item: {
            _id: string;
            imageURL: string;
            tags: string[];
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
              textForButton={"удалить"}
            />
          )
        )
      )}
    </>
  );
};

export default AccountPage;
