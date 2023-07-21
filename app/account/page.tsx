"use client";
import { useState } from "react";
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

const AccountPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState("");
  const [error, setError] = useState({
    fileUpload: "",
    tags: "",
  });
  const [preView, setPreView] = useState('')

  const handleChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setError({ ...error, fileUpload: "", tags: "" });
    setPreView(URL.createObjectURL(e.target.files[0]))
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
    alert("ok");
  };

  return (
    <>
      <div className={styles.container}>
        <ProfileCard />
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
      {/*     <PhotoList /> */}

    </>
  );
};

export default AccountPage;
