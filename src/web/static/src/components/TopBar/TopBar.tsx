import React = require("react");
import { AppBar, Toolbar, Hidden, IconButton, Typography, Button, Menu, Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer, MenuItem } from "material-ui";
import NavList from "../NavList/NavList";
import { withLocalize, LocalizeContextProps, Translate } from "react-localize-redux";
import LanguageSelect from "../LanguageSelect";
import './topBar.scss';

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
            <div className="top-bar">                
                <Grid container alignItems="center" direction="row" justify="space-between">
                    <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Hidden mdUp>
                                    <IconButton color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer()}>
                                        <MenuIcon/>
                                    </IconButton>
                                    <Drawer open={this.state.listOpened} containerStyle={{maxWidth: '220px'}}>
                                    <div
                                        onClick={this.toggleDrawer.bind(this)}
                                        onKeyDown={this.toggleDrawer.bind(this)}
                                        className="drawer">
                                            <NavList/>
                                        </div>
                                    </Drawer>
                                </Hidden>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" color="inherit" className="app-title">
                                    <Translate id="title">Blood tests OCR</Translate>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="lang-select">
                        <LanguageSelect/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withLocalize(TopBar)