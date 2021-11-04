import React, { lazy, useState } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import DietWeek from './DietWeek';
import DietDay from './DietDay';

const Diet = () => {
    const [value, setValue] = useState(new Date(Date.now()));
    const [day, setDay] = useState(false);
    const [week, setWeek] = useState(false);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container>
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
                onClick={function () {
                    if (week) {
                        setWeek(false);
                    }
                    setDay(true);
                }}
            >
                1일
            </Button>
            <Button
                variant="contained"
                onClick={function () {
                    if (day) {
                        setDay(false);
                    }
                    setWeek(true);
                }}
            >
                1주일
            </Button>
            <Grid container mt={3}>
                {week ? <DietWeek value={value} /> : <div />}
            </Grid>
            <Grid container mt={3}>
                {day ? <DietDay value={value} /> : <div />}
            </Grid>
        </Grid>
    );
};

export default Diet;
