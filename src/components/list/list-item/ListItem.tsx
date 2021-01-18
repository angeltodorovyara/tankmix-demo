import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'

interface ListItemProps {
    disabled?: boolean
    content: string
    onClick?: () => void
}

const ListItemComponent: React.FC<ListItemProps> = props => {
    return <ListItem button divider disabled={props.disabled}>
        <ListItemText primary={props.content} onClick={props.onClick} />
    </ListItem>
}

export default ListItemComponent