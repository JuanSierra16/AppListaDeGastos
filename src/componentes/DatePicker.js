import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import styled from 'styled-components';
import theme from '../theme';

const formatFecha = (fecha = new Date()) => {
    return format(fecha, `dd 'de' MMMM 'de' yyyy`, {locale: es})
}

const DatePicker = ({ fecha, cambiarFecha }) => {
    const [visible, cambiarVisible] = useState(false);
    const dayPickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
                cambiarVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <ContenedorInput>
            <input
                type='text'
                readOnly
                value={formatFecha(fecha)}
                onClick={() => cambiarVisible(!visible)}
            />
            {visible &&
                <div ref={dayPickerRef}>
                    <DayPicker
                        mode='single'
                        selected={fecha}
                        onSelect={cambiarFecha}
                        locale={es}
                        required
                        onDayClick={() => cambiarVisible(!visible)}
                        showOutsideDays
                        fixedWeeks
                    />
                </div>
            }
        </ContenedorInput>
    );
}

const ContenedorInput = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

export default DatePicker;
