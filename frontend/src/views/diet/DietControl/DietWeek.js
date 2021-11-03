import { Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import DietCard from 'views/dashboard/Default/DietCard';

const apiURL = 'http://localhost:3000';

const DietWeek = (value) => {
    const x = value['value'];
    const arr = [];
    for (let i = 0; i < 7; i++) {
        arr.push(new Date(x.valueOf() + 1000 * i * 3600 * 24));
    }

    return (
        <>
            <Grid container spacing={3}>
                {arr.map((item) => (
                    <Grid item xs={4} key={item}>
                        <DietCard value={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default DietWeek;
