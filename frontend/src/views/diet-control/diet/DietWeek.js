import { Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import DietCard from 'views/dashboard/Default/DietCard';

const apiURL = 'http://localhost:3000';

const DietWeek = (value) => {
    const d = value['value'].toString();
    const arr = [1, 2, 3, 4, 5, 6, 7];

    return (
        <>
            <Grid container spacing={3}>
                {arr.map((item) => (
                    <Grid item xs={4} key={item}>
                        <DietCard value={value} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default DietWeek;
