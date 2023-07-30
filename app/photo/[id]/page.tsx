"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PhotoList from "@/components/PhotoList";
import Title from "@/components/Title";
import { fetchPhoto } from "@/store/PhotoSlice";
import { fetchPhotosAuthor } from "@/store/PhotosAuthorSlice";
import Loader from "@/components/Loader";
import StatusTextForServer from "@/components/StatusTextFoServer";

const Photo = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { list, loading } = useAppSelector((state) => state.PhotoSlice);
  const photosAuthor = useAppSelector((state) => state.PhotosAuthorSlice);

  useEffect(() => {
    dispatch(fetchPhoto(params.id));
  }, []);

  useEffect(() => {
    dispatch(fetchPhotosAuthor(list[0].user._id));
  }, []);

  return (
    <>
      {loading === "pending" && <Loader />}
      {loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
      {loading === "fulfilled" && (
        <>
          <PhotoList
            key={list[0]._id}
            id={list[0]._id}
            imageURL={list[0].imageURL}
            tags={list[0].tags}
            size={list[0].size}
            user={list[0].user.fullName}
            createdAt={list[0].createdAt}
            textForButton={"купить"}
          />
        </>
      )}
      <Title text={"Другие фото автора"} />
      {photosAuthor.loading === "pending" && <Loader />}
      {photosAuthor.loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
      {loading === "fulfilled" &&
        photosAuthor.list.map(
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
            />
          )
        )}
    </>
  );
};

export default Photo;
