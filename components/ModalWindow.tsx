import styles from "./../stylescomponent/ModalWindow.module.css";
import TextField from "./TextField";
import LabelText from "./LabelText";
import HelperText from "./HelperText";
import { tagsStoreChange, priceStoreChange, handleStoreFocus, setTagsError, setPriceError } from "@/store/ChangeInputSlice";
import { checkPrice } from "@/helper/CheckPrice";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { FC } from "react";

type ModalWindowProps = {
  id?: string;
  closeModalWindow: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ id, closeModalWindow }) => {
  const dispatch = useAppDispatch();

  const { tagsStore, priceStore, errorPriceStore, errorTagsStore } = useAppSelector(state => state.ChangeInputSlice)

  const tagsChange = (value: string) => {
    dispatch(tagsStoreChange(value))
  }

  const priceChange = (value: string) => {
    if (checkPrice(value)) {
      dispatch(priceStoreChange(value))
      dispatch(setPriceError(''))
    }
    if (!checkPrice(value) + ' ' + "1") {
      dispatch(setPriceError('введите число'))
    }

  }

  const handleFocus = () => {
    dispatch(handleStoreFocus())
  }



  return (
    <div className={styles.container}>
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
              <div className="card-content">
                <LabelText text={"Цена"} />
                <TextField
                  typeText={"text"}
                  valueText={priceStore}
                  funcChange={priceChange}
                  nameText="цена"
                  idText={"цена"}
                />
                <HelperText text={errorPriceStore} />
              </div>
              <div className="card-action">
                <a >отправить</a>
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

