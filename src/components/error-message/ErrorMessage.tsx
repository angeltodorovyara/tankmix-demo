import React from 'react'
import { Alert } from '@material-ui/lab'

interface ErrorMessageProps {
    message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = props => {
    return (
        <Alert severity="error">
            {props.message}
        </Alert>
    )
}

export default ErrorMessage