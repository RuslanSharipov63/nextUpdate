import Image from "next/image";
import style from "./../stylescomponent/PhotoList.module.css";
import Button from "./Button";

const PhotoList = () => {
  const funcDeletePhoto = () => {
    alert("Фото удалено");
  };

  return (
    <>
      <div className={style.container}>
        <div className="card">
          <div className="card-image">
            <Image
              src="/image/photo/s1200.jpg"
              width={200}
              height={300}
              alt="картинка"
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
          <div className="card-action">
            <Button text={"удалить"} funcClick={funcDeletePhoto} />
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <Image
              src="/image/photo/s1200.jpg"
              width={200}
              height={300}
              alt="картинка"
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
          <div className="card-action">
            <Button text={"удалить"} funcClick={funcDeletePhoto} />
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <Image
              src="/image/photo/s1200.jpg"
              width={200}
              height={300}
              alt="картинка"
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
          <div className="card-action">
            <Button text={"удалить"} funcClick={funcDeletePhoto} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoList;
