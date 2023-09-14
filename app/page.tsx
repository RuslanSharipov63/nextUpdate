import PhotoList from "@/components/PhotoList";
import Loader from "@/components/Loader";
import StatusTextForServer from "@/components/StatusTextFoServer";
import styles from "./page.module.css";
import { Suspense } from "react";
import { BASE_URL } from "@/baseValue";


async function getPhoto() {
  const response = await fetch(`${BASE_URL}/photos`, {
    next: {
      revalidate: 60
    }
  });
  const data = await response.json();
  return data;
}

async function Home() {
  const list = await getPhoto();
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loader />}>
        <div className={styles.containerPhotoList}>
          { list
              ? list.map((item: any) => (
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
                ))
              : <StatusTextForServer text="ошибка сервера"/>
          }
        </div>
      </Suspense>
    </main>
  );
}

export default Home;
