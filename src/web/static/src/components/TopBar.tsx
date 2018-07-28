import React = require("react");
import { AppBar, Toolbar, Hidden, IconButton, Typography, Button, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer, MenuItem } from "material-ui";
import NavList from "./NavList";
import { withLocalize, LocalizeContextProps, Translate } from "react-localize-redux";

class TopBar extends React.Component<LocalizeContextProps> {

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
                    <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
                        <Translate id="title">Blood tests OCR</Translate>
                    </Typography>
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
                </Toolbar>
            </AppBar>
        )
    }
}

export default withLocalize(TopBar)