import React from 'react'
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface ComponentProps {
    isDeactivated: boolean;
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginRight: theme.spacing(1),
            color: props => (props ? "#388e3c" : "#d32f2f")
        },
    }),
)

const DeactivateIcon: React.FC<ComponentProps> = props => {
    const classes = useStyles(props.isDeactivated)

    return <IconButton className={classes.root} onClick={props.onClick}>
        {props.isDeactivated ? <CheckCircleIcon /> : <CancelIcon />}
    </IconButton>
}

export default DeactivateIcon;