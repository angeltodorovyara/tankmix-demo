import React from 'react'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'

interface ComponentProps {
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: theme.spacing(1),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            color: "#00205b"
        },
    }),
)

const LanguageButton: React.FC<ComponentProps> = props => {
    const classes = useStyles();

    return <Button className={classes.root} onClick={props.onClick}>{props.children}</Button>
}

export default LanguageButton;