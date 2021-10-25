// material-ui
import { Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

// project imports
// import MainCard from 'ui-component/cards/MainCard';
import DietCard from 'views/dashboard/Default/DietCard';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    // <MainCard title="Sample Card">
    //     <Typography variant="body2">
    //         Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
    //         ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
    //         reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
    //         qui officiate descent molls anim id est labours.
    //     </Typography>
    // </MainCard>
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    useEffect(() => {
        axios
            .get('http:/localhost:5000/db/test')
            .then((response) => {
                console.log('db connected', response);
            })
            .catch((error) => {
                console.log('db fail', error);
            });
    });
    // 행렬식으로 card 정렬되게 바꿔야함
    return arr.map((item) => <DietCard key={item} xs={4} />);
};

export default SamplePage;
