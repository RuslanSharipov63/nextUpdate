import { FC } from "react";
import { userDataType } from "@/types/type";
import Image from "next/image";
import styles from "./../stylescomponent/ProfileCard.module.css";

type ProfileCardProps = {
  userData: userDataType;
  photolistuathorcount: string | number;
  loading: boolean | string;
  deleteAccount?: () => void;
  updateAccount?: () => void;
};



const ProfileCard: FC<ProfileCardProps> = ({
  userData,
  loading,
  photolistuathorcount,
  deleteAccount,
  updateAccount
}) => {


  return (
    <div className={styles.containerProfileCard}>
      <div className="styles.imgProfile">
        <Image
          src={`/image/accounts/${userData._id}/${userData.avatarUrl}`}
          width={100}
          height={100}
          alt="аватар"
          style={{ borderRadius: "50%" }}
          priority={true}
        />
      </div>
      <div className={`${styles.infoProfile} card-content`}>
        <div
          className={
            `${styles.blackText} 
            black-text 
            blue-text text-darken-2`
          }
        >
          имя:
          <span className={`${styles.spanText} teal lighten-4`}>
            {userData.fullName}
          </span>
        </div>
        <div className={`${styles.blackText} black-text blue-text text-darken-2`}>
          <span className="blue-text text-darken-2">
            email:
          </span>
          <span
            className={`${styles.spanText} teal lighten-4`}>
            {userData.email}
          </span>
        </div>
        <div className={`${styles.blackText} black-text blue-text text-darken-2`}>
          <span className="blue-text text-darken-2">
            фотографий:
          </span>
          <span
            className={`${styles.spanText} teal lighten-4`}
          >{photolistuathorcount}</span>
        </div>
        <div
          className={styles.iconItem}
          onClick={deleteAccount}
        >
          <span className="material-icons">
            delete
          </span>
          <p className={`${styles.iconText} blue-text text-darken-2`}>
            удалить профиль
          </p>
        </div>
        <div className={styles.iconItem} onClick={updateAccount}>
          <span className="material-icons">update</span>
          <p
            className={`${styles.iconText} 
          blue-text text-darken-2`}
          >
            редактировать профиль</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
