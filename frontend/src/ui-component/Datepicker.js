import React from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// date-fns
// npm install @date-io / date - fns

// or for Day.js
// npm install - s @date-io / dayjs

const Datepicker = () => {
    const [value, setValue] = React.useState(new Date(Date.now()));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    id="datePicker"
                    label="달력"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button
                variant="contained"
                onClick={() => {
                    console.log(value);
                }}
            >
                1일
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    console.log(value);
                }}
            >
                1주일
            </Button>
        </div>
    );
};

export default Datepicker;
