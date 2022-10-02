import React, { FC } from 'react';
import './styles.scss'
import { IButton } from '../Phone';

interface Props extends IButton{
    valueChange: (value: any) => void;
    selectedOperand: boolean;
}

const Button: FC<Props> = (props) => {
    return (
        <button 
            className={"phone_keyboards_button " + props.background + (props.double ? " double" : "") + (props.selectedOperand ? " selected" : "")}
            onClick={() => props.valueChange(props.value)}
        >
            {props.value}
        </button>
    );
};

export default Button;