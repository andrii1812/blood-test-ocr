import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import React = require("react");
import Add from '@material-ui/icons/Add';
import ListIcon from "@material-ui/icons/List"
import ChartIcon from "@material-ui/icons/ShowChart"
import { Translate } from "react-localize-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

class NavList extends React.Component<RouteComponentProps<{}, StaticContext>> {
    state = {
        items: [
            {href: '#/', icon: Add, trKey: 'navlist.addNew'},
            {href: '#/test', icon: ListIcon, trKey: 'navlist.list'},
            {href: '#/stat', icon: ChartIcon, trKey: 'navlist.stat'}
        ]
    }

    mapItem(item: any, index: number) {        
        const current = '#' + this.props.location.pathname;
        let style = {};
        if (item.href === current) {
            style = {
                backgroundColor: 'rgba(0, 151, 167, 0.06)'
            }
        }

        return (
            <ListItem button component="a" href={item.href} key={index} style={style}>
                <ListItemIcon>
                    <item.icon/>
                </ListItemIcon>                                                                       
                <ListItemText>                                        
                    <Typography noWrap variant="subheading" style={{width: 200}}>
                        <Translate id={item.trKey}/>
                    </Typography>                                        
                </ListItemText>                                    
            </ListItem>
        )
    }

    render() {
        return (
            <List component="nav">
                {this.state.items.map(this.mapItem.bind(this))}        
            </List>
        )
    }
}

export default withRouter(NavList)
