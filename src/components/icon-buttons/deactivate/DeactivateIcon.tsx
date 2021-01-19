import React from 'react'
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

interface ComponentProps {
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginRight: theme.spacing(1),
            color: "#d32f2f"
        },
    }),
)

const DeactivateIcon: React.FC<ComponentProps> = props => {
    const classes = useStyles()

    return <IconButton className={classes.root} onClick={props.onClick}>
        <CancelIcon />
    </IconButton>
}

export default DeactivateIcon;