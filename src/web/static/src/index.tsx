
import * as React from 'react'
import { render } from 'react-dom'
import './index.scss'
import 'typeface-roboto'

import { App } from './containers/App'
import { MuiThemeProvider } from 'material-ui/styles';
import getTheme from './themes/theme';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux-subspace'
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createHashHistory } from 'history';
import rootEpic from './rootEpic';
import { createEpicMiddleware } from 'redux-subspace-observable';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { CssBaseline } from '@material-ui/core';
import { LocalizeProvider } from "react-localize-redux";

const history = createHashHistory();
const rMiddleware = routerMiddleware(history);


function configureStore() {
    const store =  createStore(
        connectRouter(history)(rootReducer), 
        composeWithDevTools(
            applyMiddleware(
                createEpicMiddleware(rootEpic),
                rMiddleware))
    )

    return store
}

render(
    <Provider store={configureStore()}>
        <LocalizeProvider>        
            <ConnectedRouter history={history}>
                <MuiThemeProvider muiTheme={getTheme()}>
                    <div>
                        <CssBaseline/>
                        <App/>
                    </div>                
                </MuiThemeProvider>
            </ConnectedRouter>
        </LocalizeProvider>
    </Provider>,

    document.getElementById('root')
)