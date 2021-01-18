import React, { Fragment } from 'react'
import AppBarComponent from '../components/app-bar/AppBar'

declare let StatusBar: any;

const PageLayout: React.FC = (props) => {
    StatusBar.show();
    StatusBar.backgroundColorByHexString('#00205b');
    StatusBar.styleLightContent();


    return <Fragment>
        <AppBarComponent />
        {props.children}
    </Fragment>
}

export default PageLayout