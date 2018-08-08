import { List, ListItem, ListItemIcon, ListItemText, Typography, Hidden, withTheme, WithTheme } from "@material-ui/core";
import React = require("react");
import Add from '@material-ui/icons/Add';
import ListIcon from "@material-ui/icons/List"
import ChartIcon from "@material-ui/icons/ShowChart"
import Collections from "@material-ui/icons/Collections"
import { Translate } from "react-localize-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import './navList.scss'
import LanguageSelect from "../LanguageSelect";

class NavList extends React.Component<RouteComponentProps<{}, StaticContext> & WithTheme> {
    state = {
        items: [
            {href: '#/', icon: Collections, trKey: 'navlist.images'},
            {href: '#/add', icon: Add, trKey: 'navlist.addNew'},
            {href: '#/test', icon: ListIcon, trKey: 'navlist.list'},
            {href: '#/stat', icon: ChartIcon, trKey: 'navlist.stat'}
        ]
    }

    mapItem(item: any, index: number) {        
        const current = '#' + this.props.location.pathname;
        let style = {};
        if (item.href === current) {
            style = {
                backgroundColor: this.props.theme.palette.primary.main
            }
        }
        console.log(this.props.theme.palette)

        return (
            <ListItem button component="a" href={item.href} key={index} style={style}>
                <ListItemIcon className="link-icon">
                    <item.icon />
                </ListItemIcon>                                                                       
                <ListItemText>                                        
                    <Typography noWrap variant="subheading" className="link-text-container">
                        <div className="link-text">
                            <Translate id={item.trKey}/>
                        </div>
                    </Typography>                                        
                </ListItemText>                                    
            </ListItem>
        )
    }

    render() {
        return (
            <div className="nav-list-container-outer">
                <div className="nav-list-container">                    
                    <List component="nav" className="nav-list">   
                        {this.state.items.map(this.mapItem.bind(this))}        
                    </List>
                </div>
            </div>
        )
    }
}

export default withTheme()(withRouter(NavList))
