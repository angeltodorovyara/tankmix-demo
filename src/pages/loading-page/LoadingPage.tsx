import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
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

    return <div></div>
}

export default LoadingPage