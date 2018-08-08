import React = require("react");
import { Button, Menu } from "@material-ui/core";
import { MenuItem } from "material-ui";
import { withLocalize, LocalizeContextProps } from "react-localize-redux";

interface TopBarProps {
    isDrawer?: boolean
}

class TopBar extends React.Component<LocalizeContextProps & TopBarProps> {
    state = {
        listOpened: false,
        langSelectOpened: false,
        anchorEl: undefined
    }

    toggleDrawer(): any {
        this.setState({listOpened: !this.state.listOpened})
    }

    toggleLangSelect(e: any) {
        this.setState({langSelectOpened: !this.state.langSelectOpened, anchorEl: e.currentTarget})
    }

    render() {
        if(!this.props.activeLanguage) {
            return <div></div>
        }
        return (
            <div>
                <Button color="inherit" onClick={this.toggleLangSelect.bind(this)}>{this.props.activeLanguage.code}</Button>
                <Menu
                    open={this.state.langSelectOpened}
                    anchorEl={this.state.anchorEl}  >
                    <div onClick={this.toggleLangSelect.bind(this)} onKeyDown={this.toggleLangSelect.bind(this)}>
                        {this.props.languages.map((lang) => {
                            return <MenuItem key={lang.code} onClick={() => this.props.setActiveLanguage(lang.code)}>
                                        {lang.code}
                                    </MenuItem>
                        })}
                    </div>
                </Menu>
            </div>
        )
    }
}

/*
<AppBar position="static">
                <Toolbar variant="dense">
                    <Hidden mdUp>
                        <IconButton color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer()}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer open={this.state.listOpened}>
                        <div
                            onClick={this.toggleDrawer.bind(this)}
                            onKeyDown={this.toggleDrawer.bind(this)}>
                                <NavList/>
                            </div>
                        </Drawer>
                    </Hidden>
                    
                    
                </Toolbar>
            </AppBar>
*/

export default withLocalize(TopBar)