"use client"
import { useParams } from "next/navigation";
import { BASE_URL } from "@/baseValue";
import PhotoList from "@/components/PhotoList";
import Title from "@/components/Title";
import Loader from "@/components/Loader";
import styles from "./../../page.module.css";
import { Suspense } from "react";
import StatusTextForServer from "@/components/StatusTextFoServer";

async function getSearchPhoto() {
    const params = useParams();
    const response = await fetch(`${BASE_URL}/search/${params.searchtags}`);
    const data = await response.json();
    return data;
}

async function Search() {
    const dataSearch = await getSearchPhoto();
    return (
        <main className={styles.main}>
            <Suspense fallback={<Loader />}>
                <div className={styles.containerPhotoList}>
                    {dataSearch.success === false ? <StatusTextForServer text={'ошибка сервера'}/> : dataSearch.length === 0 ? <Title text={'ничего не найдено'} /> :
                        dataSearch.map((item: any) => (
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
                    }
                </div>
            </Suspense>
        </main>

    )
}

export default Search;