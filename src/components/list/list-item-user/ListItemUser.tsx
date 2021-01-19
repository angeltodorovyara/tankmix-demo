import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, Switch, FormControlLabel } from '@material-ui/core'
import { User } from '../../../interfaces';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/actions';

interface ComponentProps {
    data: User;
}

const ListItemUser: React.FC<ComponentProps> = (props) => {
    const dispatch = useDispatch()

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUser(props.data.email, e.target.checked))
    }

    return <ListItem button divider>
        <ListItemText primary={props.data.email} />
        <ListItemSecondaryAction>
            <FormControlLabel
                control={<Switch
                    checked={props.data.isAdmin}
                    color="default"
                    onChange={e => onChangeHandler(e)}
                />}
                label="isAdmin"
            />
        </ListItemSecondaryAction>
    </ListItem>
}

export default ListItemUser;