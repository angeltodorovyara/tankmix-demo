import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import List from '../../components/list/List'
import { RootState } from '../../store/types'
import ListItemResult from '../../components/list/list-item-result/ListItemResult'
import PageLayout from '../PageLayout'

const UserResultPage: React.FC = () => {
    const userResults = useSelector((state: RootState) => state.auth.results)
    const { t } = useTranslation()

    const renderResults = () => {
        return userResults.reverse().map((x, i) => {
            return <ListItemResult key={i} data={x} />
        })
    }

    return <PageLayout>
        <List subHeader={t('mostRecentResults')}>
            {renderResults()}
        </List>
    </PageLayout>
}

export default UserResultPage