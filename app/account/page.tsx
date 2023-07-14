"use client"
import { useState } from "react";
import Button from "@/components/Button";
/* import Image from "next/image";
import styles from "./Account.module.css"; */
import ProfileCard from "@/components/ProfileCard";
import TextFieldUploads from "@/components/TextFieldUploads";
import TextField from "@/components/TextField";

const AccountPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState('теги');

  const handleChange = (e: any) => {
    console.log(selectedFile);
    setSelectedFile(e.target.files[0]);
  };

  const tagsChange = (e: string) => {
    setTags(e);
    console.log(e);
  };

  const handleFocus = () => {
    setTags('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      M.toast({ html: "Пожалуйста выберите файл", classes: "rounded" });
      return;
    }
  }
  return (
    <>
      <ProfileCard />
      <div className="z-depth-2">
        <p
          className="flow-text teal-text lighten-2"
        >
          Загрузите файл
        </p>
        <TextFieldUploads
          typeText={"file"}
          funcChange={handleChange}
        />
        <TextField
          typeText={"text"}
          valueText={tags}
          funcChange={tagsChange}
          funcFocus={handleFocus}
          nameText="теги"
          idText={"теги"}
        />
        <Button
          text="загрузить"
          funcClick={handleUpload}
        />
      </div>
    </>
  );
};

export default AccountPage;