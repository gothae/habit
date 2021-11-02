import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import SkeletonDietCard from 'ui-component/cards/Skeleton/DietCard';
import { m } from 'store/constant';
import { Link } from 'react-router-dom';

const DietCard = ({ isLoading, value }) => {
    const d = value['value'].toString();
    const date = d.slice(8, 10);
    const month = d.slice(4, 7);
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
                        <Link to="/diet/solution">
                            <Button variant="contained" size="medium">
                                솔루션
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            )}
        </div>
    );
};

export default DietCard;
