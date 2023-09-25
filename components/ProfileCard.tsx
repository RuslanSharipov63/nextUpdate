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
      <div className={styles.wrapperProfileCard}>
        <div className={styles.imgProfile}>
          <Image
            src={`/image/accounts/${userData._id}/${userData.avatarUrl}`}
            width={200}
            height={200}
            alt="аватар"
            style={{ borderRadius: "5px", objectFit: "cover"}}
            blurDataURL={`/image/accounts/${userData._id}/${userData.avatarUrl}`}
            loading="lazy"
          />
        </div>
        <div className="collection">
          <a href="#!" className="collection-item">
            <span className="badge">{userData.fullName}</span>имя</a>
          <a href="#!" className="collection-item">
            <span className="badge">{userData.email}</span>email</a>

          <a href="#!" className="collection-item">
            <span className="badge">{photolistuathorcount}</span>кол-во фото
          </a>
          <a href="#!" className="collection-item" onClick={deleteAccount}>
            <span className="badge material-icons">delete</span>удалить
          </a>
          <a href="#!" className="collection-item" onClick={updateAccount}>
            <span className="badge material-icons">update</span>обновить
          </a>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
