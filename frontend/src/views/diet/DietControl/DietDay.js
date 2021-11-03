import { Grid, Typography } from '@mui/material';
import DietCard from 'views/dashboard/Default/DietCard';
import React, { useState } from 'react';

const DietDay = (value) => {
    return (
        <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="h3" gutterBottom>
                        아침
                    </Typography>
                    <DietCard value={value} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h3" gutterBottom>
                        점심
                    </Typography>
                    <DietCard value={value} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h3" gutterBottom>
                        저녁
                    </Typography>
                    <DietCard value={value} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DietDay;
