import React from 'react'
import { List, ListSubheader } from '@material-ui/core'

interface ListProps {
    subHeader?: string
}

const ListComponent: React.FC<ListProps> = props => {
    return <List>
        <ListSubheader>{props.subHeader}</ListSubheader>
        {props.children}
    </List>
}

export default ListComponent