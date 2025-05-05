'use client'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import PlusIcon from "@/components/ui/icons/PlusIcon";

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <input
        style={{ width: '100px', padding: '5px' }}
        onClick={onClick}
        ref={ref}
        value={value}
        placeholder={placeholder}
        readOnly
    />
));

const CustomDateRangePicker = ({ onChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleRefresh = () => {}

    const handleStartChange = (date) => {
        setStartDate(date);
        onChange(date, endDate);
    };

    const handleEndChange = (date) => {
        setEndDate(date);
        onChange(startDate, date);
    };

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
            }}>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<CustomInput placeholder="Start Date"/>}
                    />
                <span style={{margin: '0 10px'}}>to</span>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<CustomInput placeholder="End Date"/>}
                    />
            </div>

            <ButtonFlexible
                className="btn"
                onClick={handleRefresh}
                width={70}
                height={35}
                style={{
                    marginLeft: 10,
                }}
                link="#"
            >
                Refresh
            </ButtonFlexible>
        </>
    )
        ;
};

export default CustomDateRangePicker;
