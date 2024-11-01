// CustomDatePicker.tsx

import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

interface CustomDatePickerProps {
    label: string;
    topGap?: string
    handleClose: () => void;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
    maxDate?: Dayjs;
    minDate?: Dayjs;
    showDatePicker: boolean;
    courses: any[]
}

function CustomDatePicker({
    label,
    handleClose,
    value,
    onChange,
    maxDate,
    minDate,
    topGap,
    showDatePicker,
    courses
}: CustomDatePickerProps) {

    const getMinutesFromMidnight = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const hasAvailableTimeSlot = (days:any) => {
        let lastEnd = 0; // Track the end of each booked slot in minutes from midnight

        for (const day of days) {
            const startMinutes = getMinutesFromMidnight(day.startTime);
            const endMinutes = getMinutesFromMidnight(day.endTime);

            // Check if there is a gap of at least MIN_GAP_MINUTES before the next start time
            if (startMinutes - lastEnd >= parseFloat(process.env.NEXT_PUBLIC_MEETING_DURATION!)) {
                return true;
            }
            lastEnd = endMinutes;
        }

        return 24 * 60 - lastEnd >= parseFloat(process.env.NEXT_PUBLIC_MEETING_DURATION!);
    };
    const getDayName = (date: Dayjs) => date.format("dddd");
    const shouldDisableDate = (date: Dayjs) => {
        const dayName = getDayName(date);

        return courses.some(course => {
            const startDate = dayjs(course.startDate);
            const endDate = dayjs(course.endDate);

            if (date.isBetween(startDate, endDate, 'day', '[]')) {
                return course.days.some((day: any) => day.checked && day.day === dayName);
            }
            return false;
        });
    };



    return (


        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={value}
                maxDate={maxDate}
                minDate={minDate}
                onClose={handleClose}
                shouldDisableDate={shouldDisableDate}
                sx={{
                    visibility: "hidden",
                    position: "absolute",
                    top: topGap || `0`,
                    left: `0`,
                    margin: 0,
                    padding: 0,
                    "&.MuiStack-root ": {
                        padding: `0 !important`
                    }
                }}
                className='!p-0'
                open={showDatePicker}
                onChange={onChange}
            />
        </LocalizationProvider>

    );
}

export default CustomDatePicker;
