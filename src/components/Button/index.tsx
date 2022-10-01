import React, { FC } from 'react';
import './styles.scss'
import { IButton } from '../Phone';

const Button: FC<IButton> = (props) => {
    return (
        <button className={(props.double ? "double " : "") + "phone_keyboards_button " + props.background}>
            {props.value}
        </button>
    );
};

export default Button;