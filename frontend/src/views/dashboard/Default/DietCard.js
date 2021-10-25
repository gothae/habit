import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import SkeletonDietCard from 'ui-component/cards/Skeleton/DietCard';

const DietCard = ({ isLoading }) => {
    return (
        <div>
            {isLoading ? (
                <SkeletonDietCard />
            ) : (
                <Card sx={{ p: 2.25 }}>
                    <CardMedia component="img" height="100" image="\assets\images\dietImageSample.jpeg" alt="식단 사진" />
                    <CardContent>
                        <Typography component="h4">10월 25일</Typography>
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
