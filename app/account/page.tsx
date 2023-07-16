"use client";
import { useState } from "react";
import Button from "@/components/Button";
/* import Image from "next/image";
import styles from "./Account.module.css"; */
import ProfileCard from "@/components/ProfileCard";
import TextFieldUploads from "@/components/TextFieldUploads";
import TextField from "@/components/TextField";
import InfoImage from "@/components/InfoImage";

const regValue = /^[0-9A-ZА-ЯЁ]+$/i;

const AccountPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState("");
  const [error, setError] = useState({
    fileUpload: "",
    tags: "",
  });

  const handleChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setError({ ...error, fileUpload: "", tags: "" });
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
    console.log(selectedFile);
  };

  return (
    <>
      <ProfileCard />
      <div className="z-depth-2">
        <p>
          <label htmlFor="tags">Загрузите файл</label>
        </p>
        <TextFieldUploads typeText={"file"} funcChange={handleChange} />
        <p>
          <span className="helper-text">
            {error.fileUpload === "" ? null : error.fileUpload}
          </span>
        </p>
        <p>
          <label htmlFor="tags">Введите теги через пробел</label>
        </p>
        <TextField
          typeText={"text"}
          valueText={tags}
          funcChange={tagsChange}
          funcFocus={handleFocus}
          nameText="теги"
          idText={"теги"}
        />
        <p>
          <span className="helper-text">
            {error.tags === "" ? null : error.tags}
          </span>
        </p>

        <Button text="загрузить" funcClick={handleUpload} />
        {selectedFile && <InfoImage info={selectedFile} />}
      </div>
    </>
  );
};

export default AccountPage;
