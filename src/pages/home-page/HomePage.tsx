import React from 'react'
import { useHistory } from 'react-router-dom'
import PageLayout from '../PageLayout'
import TooltipAdd from '../../components/tooltip/TooltipAdd'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import { useTranslation } from 'react-i18next'
import Button from '../../components/buttons/Button'

const HomePage: React.FC = props => {
    const { t } = useTranslation();
    const history = useHistory();
    const user = useSelector((state: RootState) => state.auth)

    return <PageLayout>
        <div className="center-middle-screen">
            <Button
                variant="contained"
                size="large"
                onClick={() => history.push('/mix-products')}
            >{t('mixProducts')}</Button>
        </div>
        {user.data?.isAdmin ? <TooltipAdd /> : null}
    </PageLayout >
}

export default HomePage