import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/list/List'
import ListItemUser from '../../components/list/list-item-user/ListItemUser';
import { getAllUsers } from '../../store/actions';
import { RootState } from '../../store/types';
import PageLayout from '../PageLayout';

const AllUsersPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.admin.allUsers)
    const auth = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const renderUsers = () => {
        return users.filter(x => x.email !== auth.data?.email).map(x => <ListItemUser key={x.email} data={x} />)
    }

    return <PageLayout>
        <List subHeader={t('allusers')}>
            {renderUsers()}
        </List>
    </PageLayout>
}

export default AllUsersPage;