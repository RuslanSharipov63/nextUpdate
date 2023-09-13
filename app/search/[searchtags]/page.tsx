"use client"
import { useParams } from "next/navigation";
import { BASE_URL } from "@/baseValue";
import PhotoList from "@/components/PhotoList";
import Title from "@/components/Title";

async function getSearchPhoto() {
    const params = useParams();
    const response = await fetch(`${BASE_URL}/search/${params.searchtags}`);
    const data = await response.json();
    return data;
}

async function Search() {
    const dataSearch = await getSearchPhoto();

    return (
        <>
            {dataSearch.length === 0 ? <Title text={'ничего не найдено'} /> :
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
            </>
    )
}

            export default Search;