import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

interface LinkButtonProps {
    to: string;
    replace?: true;
}

const LinkButton: React.FC<LinkButtonProps> = props => {
    return <Button color="primary" fullWidth={true} component={RouterLink} to={props.to} replace={props.replace ? props.replace : false}>
        {props.children}
    </Button>
}

export default LinkButton