import React from 'react';
import CircularProgress from '../circular-progress/CircularProgress';
import yara_logo from '../../assets/YARA_RGB.png';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(2),
        }
    })
);

const LoadingScreen: React.FC = () => {
    const classes = useStyles()

    return <div className="center-middle-screen">
        <img className={classes.root} src={yara_logo} alt="yara logo" />
        <br />
        <CircularProgress />
    </div>
}

export default LoadingScreen;