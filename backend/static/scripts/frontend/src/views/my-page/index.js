// material-ui
import { Typography, Grid, Divider, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';

// project imports
import DietCard from 'views/dashboard/Default/DietCard';
// ==============================|| SAMPLE PAGE ||============================== //

const apiURL = 'http://localhost:3000';

const MyPage = () => {
    return (
        <MainCard title="환자 개인정보">
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="subtitle2">이름</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">고태희</Typography>
                </Grid>
                <Divider />

                <Grid item xs={6}>
                    <Typography variant="subtitle2">생년월일</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">1996년 12월 30일</Typography>
                </Grid>
                <Divider />
                <Grid item xs={6}>
                    <Typography variant="subtitle2">성별</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">남</Typography>
                </Grid>
                <Divider />
                <Grid item xs={6}>
                    <Typography variant="subtitle2">연락처</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">010-9444-7027</Typography>
                </Grid>
                <Divider />
                <Grid item xs={6}>
                    <Typography variant="subtitle2">이메일</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">koxogml@naver.com</Typography>
                </Grid>
                <Divider />
                <Grid item xs={6}>
                    <Typography variant="subtitle2">특이사항</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">
                        <ul>
                            <li>특이사항 1</li>
                            <li>특이사항 2</li>
                        </ul>
                    </Typography>
                </Grid>
                <Divider />
            </Grid>
            <Button variant="contained" align="right">
                수정하기
            </Button>
        </MainCard>
    );
};

export default MyPage;
