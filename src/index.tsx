import 'cordova_script'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import './i18n'
import 'fontsource-roboto';
import { createTables, seedTables } from './utils/dbSetupFuncs'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import auth from './store/reducers/auth'
import products from './store/reducers/products'
import result from './store/reducers/result'
import geolocation from './store/reducers/geolocation'
import { notificationSetup } from './utils/notificationSetup'

declare let window: any;
declare let StatusBar: any;
// declare let QRScanner: any;
window.db = null;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ auth, products, result, geolocation });

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

document.addEventListener('deviceready', async () => {
    window.db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default'
    })
    // QRScanner.prepare(onDone); // show the prompt

    // function onDone(err: any, status: any) {
    //     if (err) {
    //         // here we can handle errors and clean up any loose ends.
    //         console.error(err);
    //     }
    //     if (status.authorized) {
    //         // W00t, you have camera access and the scanner is initialized.
    //         // QRscanner.show() should feel very fast.
    //     } else if (status.denied) {
    //         // The video preview will remain black, and scanning is disabled. We can
    //         // try to ask the user to change their mind, but we'll have to send them
    //         // to their device settings with `QRScanner.openSettings()`.
    //     } else {
    //         // we didn't get permission, but we didn't get permanently denied. (On
    //         // Android, a denial isn't permanent unless the user checks the "Don't
    //         // ask again" box.) We can ask again at the next relevant opportunity.
    //     }
    // }

    StatusBar.hide()
    notificationSetup()

    window.db.transaction(function (tx: any) {
        createTables(tx)
    }, function (error: any) {
        console.log('Transaction ERROR: ' + error.message)
    }, function (tx: any) {
        window.db.transaction(function (tx: any) {
            seedTables(tx)
        }, function (error: any) {
            console.log('Transaction ERROR: ' + error.message)
        }, function (tx: any) {
            ReactDOM.render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>,
                document.getElementById('root')
            )
        })
    })
}, false)