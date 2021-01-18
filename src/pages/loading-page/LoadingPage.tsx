import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen'
import { RootState } from "../../store/types"

const LoadingPage: React.FC = (props) => {
    const user = useSelector((state: RootState) => state.auth)

    if (user.isDone === true) {
        if (user.data === null) {
            return <Redirect to='/login' />
        } else {
            return <Redirect to='/home' />
        }
    }

    return <LoadingScreen />
}

export default LoadingPage