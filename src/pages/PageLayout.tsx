import React, { Fragment } from 'react'
import AppBarComponent from '../components/app-bar/AppBar'

const PageLayout: React.FC = (props) => {
    return <Fragment>
        <AppBarComponent />
        {props.children}
    </Fragment>
}

export default PageLayout