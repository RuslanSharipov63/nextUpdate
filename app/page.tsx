import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { PhotoListAsyncThunk } from "@/store/PhotoListSlice";
import PhotoList from "@/components/PhotoList";
import Loader from "@/components/Loader";
import StatusTextForServer from "@/components/StatusTextFoServer";
import { fetchAuthMe } from "@/store/AuthMeSlice";
import { BASE_URL } from "@/baseValue";
import { Suspense } from "react";


async function getPhoto() {
  const response = await fetch(`${BASE_URL}/photos`)
  const data = await response.json()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return data;
}


export default async function Home() {
  const { list, loading } = await getPhoto();
  console.log(list)
  /* const { push } = useRouter(); */
  /*   const dispatch = useAppDispatch(); */
  /*   const { list, loading } = useAppSelector((state) => state.PhotoListSlice); */
  /*  const { userData } = useAppSelector((state) => state.AuthMeSlice); */

  /*   useEffect(() => {
      dispatch(fetchAuthMe());
      if (userData.hasOwnProperty("message")) {
        push("/auth");
        return;
      }
    }, []); */

  /* useEffect(() => {
    dispatch(PhotoListAsyncThunk());
  }, []); */

  return (

    <main className={styles.main}>
      <Suspense fallback={<Loader />}>
        {/* {loading === "pending" && <Loader />}
      {loading === "rejected" && (
        <StatusTextForServer text={"Ошибка сервера"} />
      )} */}
        <div className={styles.containerPhotoList}>
          {/* loading === "fulfilled" && */
            list ? list.map((item: any) => (
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
            )) : 'ошибка сервера'}
        </div>
      </Suspense>
    </main>
  );
}
