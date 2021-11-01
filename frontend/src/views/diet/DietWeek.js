import { Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

import DietCard from 'views/dashboard/Default/DietCard';

const apiURL = 'http://localhost:3000';

const DietWeek = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    useEffect(() => {
        axios
            .get(`${apiURL}/test`)
            .then((response) => {
                console.log('connected', response);
            })
            .catch((error) => {
                console.log('fail', error);
            });
    });
    // 행렬식으로 card 정렬되게 바꿔야함
    return arr.map((item) => <DietCard key={item} xs={4} />);
};

export default DietWeek;
