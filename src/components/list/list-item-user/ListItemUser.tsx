import React from 'react'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemText, ListItemSecondaryAction, Switch, FormControlLabel } from '@material-ui/core'
import { User } from '../../../interfaces';
import { updateUser } from '../../../store/actions';
import DeactivateIcon from '../../icon-buttons/deactivate/DeactivateIcon';

interface ComponentProps {
    data: User;
}

const ListItemUser: React.FC<ComponentProps> = (props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUser(props.data.email, e.target.checked))
    }

    const onDeactivateHandler = () => {
        console.log(props.data.email)
    }

    return <ListItem button divider>
        <ListItemText primary={props.data.email} />
        <ListItemSecondaryAction>
            <DeactivateIcon onClick={onDeactivateHandler} />
            <FormControlLabel
                control={<Switch
                    checked={props.data.isAdmin}
                    color="default"
                    onChange={e => onChangeHandler(e)}
                />}
                label={t('isAdmin')}
            />
        </ListItemSecondaryAction>
    </ListItem>
}

export default ListItemUser;