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
    const user: User = props.data;
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUser(user.email, e.target.checked, user.isDeactivated))
    }

    const onDeactivateHandler = () => {
        dispatch(updateUser(user.email, user.isAdmin, !user.isDeactivated))
    }

    return <ListItem button divider>
        <ListItemText primary={user.email} />
        <ListItemSecondaryAction>
            <DeactivateIcon isDeactivated={user.isDeactivated} onClick={onDeactivateHandler} />
            {user.isDeactivated ? null :
                <FormControlLabel
                    control={<Switch
                        checked={user.isAdmin}
                        color="default"
                        onChange={e => onChangeHandler(e)}
                    />}
                    label={t('isAdmin')}
                />}
        </ListItemSecondaryAction>
    </ListItem>
}

export default ListItemUser;