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
import admin from './store/reducers/admin'
import products from './store/reducers/products'
import result from './store/reducers/result'
import geolocation from './store/reducers/geolocation'
import { notificationSetup } from './utils/notificationSetup'

declare let window: any;
window.db = null;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ auth, products, result, geolocation, admin });

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

document.addEventListener('deviceready', async () => {
    window.db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default'
    })

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