import React from 'react'
import { Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { Product } from '../../interfaces';
import ImageConponent from '../product-img/ImageComponent';

interface ComponentProps {
    product: Product
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '66%',
            margin: '0 auto',
            marginBlock: theme.spacing(2)
        }
    })
);


const ResultProductCard: React.FC<ComponentProps> = props => {
    const classes = useStyles();

    return <Card className={classes.root} variant="outlined">
        <CardContent>
            {props.product.imageURL !== null ? <ImageConponent source={props.product.imageURL} /> : null}
            <Typography variant='h5'>{props.product.name}</Typography>
            <Typography variant='body1'>{props.product.description}</Typography>
        </CardContent>
    </Card>
}

export default ResultProductCard;