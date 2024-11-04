import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';




const CustomDatePicker = ({
    label,
    value,
    onChange,
    disabledDays,
    maxDate,
    minDate,
    topGap,
    showDatePicker,
    handleClose
}) => {
    const isDayDisabled = (date) => {
        return disabledDays.some((day) => dayjs(day).isSame(date, 'day'));
    };

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={value}
                onChange={onChange}
                maxDate={maxDate}
                minDate={minDate}
                open={showDatePicker}
                onClose={handleClose}
                shouldDisableDate={isDayDisabled}
                sx={{
                    position: 'absolute',
                    top: topGap || '0',
                    left: '0',
                    visibility: `hidden`
                }}
            />
        </LocalizationProvider>

    );
};

export default CustomDatePicker;
