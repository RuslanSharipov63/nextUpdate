"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { PhotoListAsyncThunk } from "@/store/PhotoListSlice";
import PhotoList from "@/components/PhotoList";
import Loader from "@/components/Loader";
import StatusTextForServer from "@/components/StatusTextFoServer";
import { fetchAuthMe } from "@/store/AuthMeSlice";

export default function Home() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.PhotoListSlice);
  const { userData } = useAppSelector((state) => state.AuthMeSlice);

  useEffect(() => {
    dispatch(fetchAuthMe());
    if (userData.hasOwnProperty("message")) {
      push("/auth");
      return;
    }
  }, []);

  useEffect(() => {
    dispatch(PhotoListAsyncThunk());
  }, []);

  return (
    <main className={styles.main}>
      {loading === "pending" && <Loader />}
      {loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )}
      <div className={styles.containerPhotoList}>
        {loading === "fulfilled" &&
          list.map((item) => (
            <PhotoList
              key={item._id}
              id={item._id}
              imageURL={item.imageURL}
              tags={item.tags}
              size={item.size}
              price={item.price}
              user={item.user.fullName}
              createdAt={item.createdAt}
            />
          ))}
      </div>
    </main>
  );
}
