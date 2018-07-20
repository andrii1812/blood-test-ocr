import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';

export default () => {
  let overwrites = {
        "palette": {
            "primary1Color": Colors.cyan700,
            "accent1Color": Colors.indigoA200
        }
    };
    return getMuiTheme(baseTheme, overwrites);
}