"use client";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PhotoList from "@/components/PhotoList";
import Title from "@/components/Title";
import { fetchPhoto } from "@/store/PhotoSlice";
import Loader from "@/components/Loader";
import { IinitialStateList } from "@/types/type";


type PhotoProp = {
  id: string;
};

const Photo: FC<PhotoProp> = ({ id }) => {
  const dispath = useAppDispatch();
  const paramsId = useParams();
  const [a, setA] = useState<IinitialStateList[]>()
  const { list, loading } = useAppSelector((state) => state.PhotoSlice);

  const funcD = () => {
    setA(list)
  }
  useEffect(() => {
    if (list.length > 0) {
      dispath(fetchPhoto(paramsId.id));
      funcD()
      return
    }

  }, [a]);

console.log(a)

  return (
    <>
     {/*  {loading === "pending" && <Loader />}
      {loading === "rejected" && 'Ошибка сервера'}
      {loading === "fulfilled" && (
        <PhotoList
          key={list[0]._id}
          id={list[0]._id}
          imageURL={list[0].imageURL}
          tags={list[0].tags}
          size={list[0].size}
          user={list[0].user.fullName}
          createdAt={list[0].createdAt}
        />
      )}
      <Title text={"Другие фото автора"} /> */}
    </>
  );
};

export default Photo;
