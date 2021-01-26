import React from 'react'
import { Alert } from '@material-ui/lab'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

interface ErrorMessageProps {
    message: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(2),
        }
    })
)

const ErrorMessage: React.FC<ErrorMessageProps> = props => {
    const classes = useStyles();
    const { t } = useTranslation();

    return <Alert severity="error" className={classes.root}>
        {t(props.message)}
    </Alert>
}

export default ErrorMessage