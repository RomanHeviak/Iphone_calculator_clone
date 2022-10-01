import React, { useEffect, useState } from 'react';
import { Batery } from '../../assets/svg/batery';
import { Wifi } from '../../assets/svg/wifi';
import Button from '../Button';
import './styles.scss';
import keyboard_config from  '../../keyboard_config';

export interface IButton {
    value: string | number;
    background: 'primary' | 'gray' | 'orange';
    double? : boolean;
}

const Phone = () => {
    const [keyboard, setKeyboard] = useState<any>();

    useEffect(() => {
        setKeyboard(Object.values(keyboard_config))
    },[])

    return (
        <div className='phone'>
            <div className='phone_header'>
                <div className="phone_header_left">9:41</div>
                <div className="phone_header_right">
                    {Wifi()}
                    {Batery()}
                </div>
            </div>
            <div className="phone_screen">
                <p>0</p>
            </div>
            <div className="phone_keyboards">
                {keyboard && keyboard.map(((row: IButton[]) => (
                    <div className="phone_keyboards_row">
                        {row.map((button: IButton) => (
                            <Button
                            value={button.value}
                            background={button.background}
                            double={button.double}
                        />
                        ))}
                    </div>
                )))}
            </div>
        </div>
    );
};

export default Phone;