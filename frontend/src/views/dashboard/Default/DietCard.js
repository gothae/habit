import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import SkeletonDietCard from 'ui-component/cards/Skeleton/DietCard';

const DietCard = ({ isLoading, value }) => {
    const m = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };
    const d = value['value'].toString();
    const date = d.slice(8, 10);
    const month = d.slice(4, 7);
    // console.log(value.getMonth().toString(), typeof value);
    // console.log(d, typeof d);
    return (
        <div>
            {isLoading ? (
                <SkeletonDietCard />
            ) : (
                <Card sx={{ p: 2.25 }}>
                    <CardMedia component="img" height="100" image="/src/assets/images/dietImageSample.jpeg" alt="식단 사진" />
                    <CardContent>
                        <Typography component="h4">{`${m[month]}월 ${date}일`}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="medium">
                            솔루션
                        </Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
};

export default DietCard;
