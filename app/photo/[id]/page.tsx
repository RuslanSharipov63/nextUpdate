"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PhotoList from "@/components/PhotoList";
import Title from "@/components/Title";
import { fetchPhoto } from "@/store/PhotoSlice";
import Loader from "@/components/Loader";
import StatusTextForServer from "@/components/StatusTextFoServer";

const Photo = () => {
  const dispath = useAppDispatch();
  const params = useParams();

  const { list, loading } = useAppSelector((state) => state.PhotoSlice);
  useEffect(() => {
    dispath(fetchPhoto(params.id));
  }, []);

  return (
    <>
      {loading === "pending" && <Loader />}
      {loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
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
      <Title text={"Другие фото автора"} />
    </>
  );
};

export default Photo;
