import { FC } from 'react';
import styles from './../stylescomponent/PushComponent.module.css';
import Button from './Button';


type PushComponentProp = {
    text: string;
    stateValue: boolean;
    closePushComponent: () => void;
    disabled?: false
}

const PushComponent: FC<PushComponentProp> = ({
    text, stateValue, closePushComponent, disabled }) => {


    return (
        <div className={styles.container + ' ' + (stateValue ? styles.opacityClassOne : styles.opacityClassZero)}>
            <p className={styles.text}>{text}</p>
            <Button text={"закрыть"} funcClick={closePushComponent} disabled={disabled} />
        </div>
    );
}

export default PushComponent;