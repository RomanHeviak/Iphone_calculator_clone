import React, { useEffect, useState } from 'react';
import { Batery } from '../../assets/svg/batery';
import { Wifi } from '../../assets/svg/wifi';
import Button from '../Button';
import './styles.scss';
import keyboard_config from  '../../keyboard_config';
import { v4 as uuidv4 } from 'uuid';


export interface IButton {
    value: string | number;
    background: 'primary' | 'gray' | 'orange';
    double? : boolean;
}

const Phone = () => {
    const [keyboard, setKeyboard] = useState<any>();
    const [dispayValue, setDispayValue] = useState<number>(0);
    const [leftValue, setLeftValue] = useState<string>('');
    const [rightValue, setRightValue] = useState<string>('');
    const [operand, setOperand] = useState<string[]>([]);
    const [proceed, setProceed] = useState(false);
    const [minusValue, setMinusValue] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        setKeyboard(Object.values(keyboard_config));
        setInterval(() => setCurrentTime(new Date()),10000)
    },[])

    useEffect(() => {
        if(!rightValue) {
            setDispayValue(+leftValue)
        }
        if(rightValue) {
            setDispayValue(+rightValue)
        }
    },[leftValue, rightValue])

    const generateButton = (props: IButton) => {
        let onClick= null;
        if(props.value === 'AC' || props.value === 'C') {
            props.value = proceed ? 'C' : 'AC';
            onClick = reset;
        }else if (props.value === '='){
            onClick = calculate;
        }else {
            onClick = onKeyboardChange;
        }
        return (
            <Button
                key={uuidv4()}
                value={props.value}
                background={props.background}
                double={props.double}
                valueChange={onClick}
                selectedOperand={operand[operand.length - 1] === props.value || (props.value === '-' && minusValue)}
            />
        )
    }

    const calculate = () => {
        switch(operand[operand.length - 1]) {
            case '+' : {
                setDispayValue(+leftValue + +rightValue);
                setLeftValue(String(+leftValue + +rightValue));
                break
            }
            case '-' : {
                setDispayValue(+leftValue - +rightValue);
                setLeftValue(String(+leftValue - +rightValue));
                break
            }
            case 'x' : {
                setDispayValue(+leftValue * +rightValue);
                setLeftValue(String(+leftValue * +rightValue));
                break
            }
            case '÷' : {
                setDispayValue(+leftValue / +rightValue);
                setLeftValue(String(+leftValue / +rightValue));
                break
            }
            case '%' : {
                setDispayValue(+leftValue % +rightValue);
                setLeftValue(String(+leftValue % +rightValue));
                break
            }
        }
        setRightValue('')
        setOperand([]);
    }

    const onKeyboardChange = (value: number | string) => {
        if(!isNaN(+value)){
            if(!operand.length){
                setMinusValue(false);
                setLeftValue(leftValue + value)
            }else {
                setRightValue(rightValue + value)
            }
        }else {
            if(!proceed && value === '-'){
                setLeftValue('-0');
                setMinusValue(true);
            }
            if(proceed) {
                setOperand([...operand, value as string]);
            }
            if(leftValue && rightValue) {
                calculate();
                setOperand([...operand, value as string]);
            }
        }
        setProceed(true);
    }

    const reset = () => {
        setDispayValue(0);
        setOperand([]);
        setLeftValue('');
        setRightValue('');
        setProceed(false);
        setMinusValue(false);
    }

    return (
        <div className='phone'>
            <div className='phone_header'>
                <div className="phone_header_left">{currentTime.getHours()}:{currentTime.getMinutes()}</div>
                <div className="phone_header_right">
                    {Wifi()}
                    {Batery()}
                </div>
            </div>
            <div className="phone_screen">
                <p>{dispayValue}</p>
            </div>
            <div className="phone_keyboards">
                {keyboard && keyboard.map(((row: IButton[]) => (
                    <div className="phone_keyboards_row" key={uuidv4()}>
                        {row.map((button: IButton) => (
                            generateButton(button)
                        ))}
                    </div>
                )))}
            </div>
        </div>
    );
};

export default Phone;