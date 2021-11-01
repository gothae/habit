import { Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

import DietCard from 'views/dashboard/Default/DietCard';

const apiURL = 'http://localhost:3000';

const DietWeek = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <>
            <Grid container spacing={3}>
                {arr.map((item) => (
                    <Grid item xs={4}>
                        <DietCard key={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default DietWeek;
