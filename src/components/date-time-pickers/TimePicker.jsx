import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';




const CustomTimePicker = ({
  label,
  value,
  onChange,
  showTimePicker,
  handleClose,
  minTime,
  maxTime,
  topGap,
  conflictTimes
}) => {
  const isTimeDisabled = (timeValue, clockType) => {
    if (clockType === 'minutes') {
      const formattedTime = dayjs(timeValue)
        .format('HH:mm');

      return conflictTimes.includes(formattedTime);
    }
    return false;
  };
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        minTime={minTime}
        maxTime={maxTime}
        value={value}
        ampm={false}
        onChange={onChange}
        open={showTimePicker}
        onClose={handleClose}
        shouldDisableTime={isTimeDisabled}
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

export default CustomTimePicker;
