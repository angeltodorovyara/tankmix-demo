import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

interface ListItemProps {
    content: string
    onClick: () => void
}

const ListItemComponent: React.FC<ListItemProps> = props => {
    return <ListItem button divider>
        <ListItemText primary={props.content} />
        <ListItemSecondaryAction>
            <IconButton onClick={props.onClick}>
                <DeleteForeverIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}

export default ListItemComponent