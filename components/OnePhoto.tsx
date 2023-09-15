import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { arrForEditPhotoType } from "@/types/type";


type OnePhotoProps = {
  id: string;
  imageURL: string;
};

const OnePhoto: FC<OnePhotoProps> = ({ id, imageURL }) => {
  return (
    <div key={id}>
      <div className="card-image">
        <Link href={`/photo/${id}`}>
          <Image
            src={`${imageURL}`}
            width={300}
            height={300}
            alt="картинка"
            blurDataURL={`${imageURL}`}
            loading="lazy"
            sizes="100vw"
            style={{
              width: "60%",
              marginLeft: "15%",
              marginRight: "15%",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default OnePhoto;
