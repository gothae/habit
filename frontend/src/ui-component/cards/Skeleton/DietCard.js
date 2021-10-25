import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const DietCard = () => {
    return (
        <Card>
            <CardContent>
                <Grid container direction="column">
                    {/* 식단 사진 */}
                    <Grid item>
                        <Skeleton variant="rectangular" width={100} height={100} />
                    </Grid>
                    {/* 날짜 */}
                    <Grid item>
                        <Skeleton variant="text" />
                    </Grid>
                    {/* 솔루션 확인 버튼 */}
                    <Grid item>
                        <Skeleton variant="rectangular" width={100} height={40} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DietCard;
