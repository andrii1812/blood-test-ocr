
import * as React from 'react'
import { render } from 'react-dom'
import './index.scss'
import 'typeface-roboto'

import App from './containers/App'
import { MuiThemeProvider } from 'material-ui/styles';
import getTheme from './themes/theme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const rMiddleware = routerMiddleware(history);


function configureStore() {
    return createStore(
        rootReducer, 
        composeWithDevTools(applyMiddleware(thunk, rMiddleware))
    )
}

render(
    <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
        <MuiThemeProvider muiTheme={getTheme()}>
            <App/>
        </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,

    document.getElementById('root')
)