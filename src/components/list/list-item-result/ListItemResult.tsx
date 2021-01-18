import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { MixResult } from '../../../interfaces';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
    data: MixResult;
}

const ListItemResult: React.FC<ComponentProps> = props => {
    const { t } = useTranslation()
    const { f_product, s_product, datetime } = props.data

    return <ListItem button={false} divider>
        <ListItemText
            primary={`${t('mixOf')} ${f_product} ${t('and')} ${s_product}`}
            secondary={t('date', { date: new Date(datetime) })}
        />
    </ListItem>
}

export default ListItemResult;