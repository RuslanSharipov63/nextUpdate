import Image from "next/image";
import styles from './../stylescomponent/ProfileCard.module.css'

const ProfileCard = () => {
    return (
        <div className={styles.container}>
            <div className="styles.imgProfile">
                <Image
                    src="/image/profile/bear.jpg"
                    width={100}
                    height={100}
                    alt="аватар тигр"
                    style={{ borderRadius: '50%' }}
                    priority={true}
                />
            </div>
            <div className={`${styles.infoProfile} card-content`}>
                <div className="black-text">Алина Шарипова</div>
                <div className="black-text">Электронная почта: ivanov@mail.ru</div>
                <div className="black-text">Кол-во фотографий: 544</div>

            </div>
        </div>

    );
}

export default ProfileCard;