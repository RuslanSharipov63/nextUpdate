import { FC } from "react";
import Button from "./Button";

type PhotoInfoProps = {
user: string;
tags: string;
size: number;
price: number;
dateCreatePhoto: string;
valueForButton: boolean;

}

const PhotoInfo: FC<PhotoInfoProps> = ({
user, 
tags, 
size, 
price, 
dateCreatePhoto, 
valueForButton, 
}) => {
    return (
        <>
            <div className="card-content">
                <span className="card-title">фото: {user}</span >
                <p>теги: {tags}</p>
                <p>размер: {(size / 1024 / 1024).toFixed(2)} мб</p>
                <p>цена: {price ? price + " руб" : "бесплатно"}</p>
                <p>дата создания: {dateCreatePhoto}</p>
            </div >
            {valueForButton && (
                <div className="card-action">
                    <Button
                        text={valueForButton[0] && valueForButton[0]}
                        funcClick={funcDeletePhoto}
                        disabled={disabledValueDelete}
                    />
                    <Button
                        text={valueForButton[3] && valueForButton[3]}
                        funcClick={funcEditPhoto}
                    />
                </div>
            )}
        </>
    );
}

export default PhotoInfo;