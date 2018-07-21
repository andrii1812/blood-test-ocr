
import * as React from 'react'
import { render } from 'react-dom'
import './index.scss'
import 'typeface-roboto'

import App from './containers/App'
import { MuiThemeProvider } from 'material-ui/styles';
import getTheme from './themes/theme';

render(
    <MuiThemeProvider muiTheme={getTheme()}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
)