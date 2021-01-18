import { createStyles, Fab, makeStyles, Theme, Tooltip } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            backgroundColor: '#00205b',
            color: 'white',

            '&:hover': {
                backgroundColor: '#00205b'
            }
        },
    }),
);

const TooltipAdd: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    return <Tooltip title=''>
        <Fab className={classes.root} onClick={() => history.push('/add-product')}>
            <AddIcon />
        </Fab>
    </Tooltip>
}

export default TooltipAdd