"use client";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { PhotoListAsyncThunk } from "@/store/PhotoListSlice";
import PhotoList from "@/components/PhotoList";
import Loader from "@/components/Loader";
import StatusTextForServer from "@/components/StatusTextFoServer";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.PhotoListSlice);

  useEffect(() => {
    dispatch(PhotoListAsyncThunk());
  }, []);

  return (
    <main className={styles.main}>
      {loading === "pending" && <Loader />}
      {loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
      {loading === "fulfilled" &&
        list.map((item) => (
          <PhotoList
            key={item._id}
            id={item._id}
            imageURL={item.imageURL}
            tags={item.tags}
            size={item.size}
            user={item.user.fullName}
            createdAt={item.createdAt}
          />
        ))}
    </main>
  );
}
