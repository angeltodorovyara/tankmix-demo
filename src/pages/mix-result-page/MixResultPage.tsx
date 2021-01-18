import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import PageLayout from '../PageLayout'
import AddIcon from '@material-ui/icons/Add';
import ResultProductCard from '../../components/result-product-card/ResultProductCard'
import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { mixResultCleanUp } from '../../store/actions'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '50%',
            margin: '0 auto',
            marginTop: theme.spacing(1)
        }
    })
);

const MixResultPage: React.FC = props => {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const result = useSelector((state: RootState) => state.result)

    useEffect(() => {

        return function cleanup() {
            dispatch(mixResultCleanUp())
        }
    }, [dispatch])

    return <PageLayout>
        <div className='center-middle-screen'>
            <Typography variant="h4" gutterBottom>{t('mixResult')}</Typography>
            <ResultProductCard product={result.data[0]} />
            <AddIcon />
            <ResultProductCard product={result.data[1]} />
            <Button className={classes.root} color="primary" component={RouterLink} to='/home' replace>{t('home')}</Button>
        </div>
    </PageLayout>
}

export default MixResultPage