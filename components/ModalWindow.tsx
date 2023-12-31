"use client"
import styles from "./../stylescomponent/ModalWindow.module.css";
import TextField from "./TextField";
import LabelText from "./LabelText";
import HelperText from "./HelperText";
import {
  tagsStoreChange,
  priceStoreChange,
  handleStoreFocus,
  setTagsError,
  setPriceError,
} from "@/store/ChangeInputSlice";
import { checkPrice } from "@/helper/CheckPrice";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { FC } from "react";
import { fetchUpdatePhoto } from "@/store/UpdatePhotoSlice";
import { checkTags } from "@/helper/CheckTags";

type ModalWindowProps = {
  closeModalWindow: () => void;
};
const ModalWindow: FC<ModalWindowProps> = ({ closeModalWindow }) => {
  
  const dispatch = useAppDispatch();
  const { id, tagsStore, priceStore, errorPriceStore, errorTagsStore } =
    useAppSelector((state) => state.ChangeInputSlice);

  const tagsChange = (value: string) => {
    dispatch(tagsStoreChange(value));
  };

  const priceChange = (item: string) => {
    if (!checkTags(tagsStore)) {
      dispatch(
        setTagsError("Введите теги через пробел. Тег больше одного символа")
      );
      return;
    }
    if (checkPrice(item) === true || item === "") {
      dispatch(priceStoreChange(item));
      dispatch(setPriceError(""));
    }
    if (checkPrice(item) === false) {
      dispatch(setPriceError("введите число"));
    }
  };

  const handleFocus = () => {
    dispatch(handleStoreFocus());
  };
  const updatePhoto = async () => {
    if (!checkTags(tagsStore)) {
      dispatch(
        setTagsError("Введите теги через пробел. Тег больше одного символа")
      );
      return;
    }

    if (errorTagsStore != "") {
      dispatch(setTagsError("теги заполнены некорректно"));
      return;
    }
    if (errorPriceStore != "") {
      dispatch(setPriceError("цена заполнена некорректно"));
      return;
    }
    const updatePhoto = {
      id,
      tags: tagsStore,
      price: Number(priceStore),
    };
    await dispatch(fetchUpdatePhoto(updatePhoto));
    await dispatch(tagsStoreChange(''));
    await dispatch(priceStoreChange(''));
    await closeModalWindow();
  };

  return (
    <div className={styles.containerModWin}>
      <div className="row">
        <div className="col s12 m7 offset-m3 l6 offset-l3 xl4 offset-xl4 ">
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <LabelText text={"Введите теги через пробел"} />
                <TextField
                  typeText={"text"}
                  valueText={tagsStore}
                  funcChange={tagsChange}
                  funcFocus={handleFocus}
                  nameText="теги"
                  idText={"теги"}
                />
                <HelperText text={errorTagsStore} />
              </div>
            {/*   <div className="card-content">
                <LabelText text={"Цена"} />
                <TextField
                  typeText={"text"}
                  valueText={priceStore}
                  funcChange={priceChange}
                  nameText="цена"
                  idText={"цена"}
                />
                <HelperText text={errorPriceStore} />
              </div> */}
              <div className="card-action">
                <a onClick={updatePhoto}>отправить</a>
                <a onClick={() => closeModalWindow()}>закрыть</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
