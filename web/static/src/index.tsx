
import * as React from 'react'
import { render } from 'react-dom'
import './index.scss'

import App from './containers/App'
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './themes/theme';

render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
)