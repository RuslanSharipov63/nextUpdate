"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { fetchPhotosAuthor } from "@/store/PhotosAuthorSlice";
import { fetchAddPhoto } from "@/store/AddPhotoSlice";
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

const regValue = /^[0-9A-ZА-ЯЁ]+$/i;
type newArrPhotoType = {
  /* fileObg: {
    name: string
  } */
  imageURL: string;
  tags: string[];
  user: string;
  size: number
}
const AccountPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { userData, loading } = useAppSelector((state) => state.AuthMeSlice);
  const { list } = useAppSelector((state) => state.PhotosAuthorSlice);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState("");
  const [error, setError] = useState({
    fileUpload: "",
    tags: "",
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
  const handleFocus = () => {
    setTags("");
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setError({ ...error, fileUpload: "Выберите файл" });
      return;
    }
    let tagsArr = tags.split(" ");
    let newTagsArr = tagsArr.filter((el) => el.search(regValue) != -1);

    if (newTagsArr.length === 0) {
      setError({
        ...error,
        tags: "Введите теги через пробел. Тег больше одного символа",
      });
      return;
    }
   
    const { name, size } = selectedFile
    
    /* let newArrPhoto: newArrPhotoType = {
      fileObg: 
      imageURL: name,
      tags: tagsArr,
      user: params.id,
      size: size,
    } */
    dispatch(fetchAddPhoto(selectedFile))
  };

  const checkUserDataMessage = () => {
    if ("message" in userData) push("/auth");
    return;
  };

  return (
    <>
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
            user: { fullName: string };
            createdAt: string;
          }) => (
            <PhotoList
              key={item._id}
              id={item._id}
              imageURL={item.imageURL}
              tags={item.tags}
              size={item.size}
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
