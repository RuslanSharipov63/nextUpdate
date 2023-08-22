import { FC } from "react";
import { userDataType } from "@/types/type";
import Image from "next/image";
import styles from "./../stylescomponent/ProfileCard.module.css";

type ProfileCardProps = {
  userData: userDataType;
  photolistuathorcount: string | number;
  loading: boolean | string;
  deleteAccount?: () => void;
};



const ProfileCard: FC<ProfileCardProps> = ({
  userData,
  loading,
  photolistuathorcount,
  deleteAccount
}) => {


  return (
    <div className={styles.container}>
      <div className="styles.imgProfile">
        <Image
          src={`/image/accounts/${userData._id}/${userData.avatarUrl}`}
          width={100}
          height={100}
          alt="аватар тигр"
          style={{ borderRadius: "50%" }}
          priority={true}
        />
      </div>
      <div className={`${styles.infoProfile} card-content`}>
        <div className="black-text">{userData.fullName}</div>
        <div className="black-text">Электронная почта: {userData.email}</div>
        <div className="black-text">
          Кол-во фотографий: {photolistuathorcount}
        </div>
        <div className={styles.iconItem}
          onClick={deleteAccount}
        >
          <span className="material-icons">delete</span>
          <p className={styles.iconText}>удалить профиль</p>
        </div>
        <div className={styles.iconItem}>
          <span className="material-icons">update</span>
          <p className={styles.iconText}>редактировать профиль</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
