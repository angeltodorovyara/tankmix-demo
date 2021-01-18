import React from 'react'
import { useTranslation } from 'react-i18next';
import List from '../../components/list/List'
import PageLayout from '../PageLayout';

const AllUsersPage: React.FC = () => {
    const { t } = useTranslation();

    return <PageLayout>
        <List subHeader={t('allusers')}>

        </List>
    </PageLayout>
}

export default AllUsersPage;