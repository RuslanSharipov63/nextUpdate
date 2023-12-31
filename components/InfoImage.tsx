import { FC } from "react";
import Image from "next/image";
import styles from './../stylescomponent/InfoImage.module.css'

type info = {
  [x: string]: any;
  preView: string;
};

const InfoImage: FC<info> = (props) => {
  return (
    <div className={`${styles.container} col s3 offset-s2`}>
      <ul className={`${styles.collectionContainer} collection`}>
        <li className="collection-item">имя: {props.info.name}</li>
        <li className="collection-item">тип: {props.info.type}</li>
        <li className="collection-item">
          размер: {(props.info.size / 1024 / 1024).toFixed(1)} мБ
        </li>
        <li className="collection-item">
          дата последнего изменения:{" "}
          {props.info.lastModifiedDate.toLocaleDateString()}
        </li>
        <li>
          <Image
            src={props.preView}
            width={100}
            height={100}
            alt="картинка"
            priority={true}
            style={{ objectFit: "cover",}}
          /> 
        </li>
      </ul>
    </div>
  );
};

export default InfoImage;
