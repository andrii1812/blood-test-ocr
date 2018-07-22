import * as React from "react";
import { IAppState, initState, loadReferenceNames } from "../model";
import AddNew from "./AddNew";
import {HashRouter, Route, Link, withRouter, RouteComponentProps} from 'react-router-dom';
import { Grid, List, ListItem, ListItemText, ListItemIcon, Hidden } from "@material-ui/core";
import Add from '@material-ui/icons/Add';
import ListIcon from "@material-ui/icons/List"
import ChartIcon from "@material-ui/icons/ShowChart"

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = initState();
        this.loadReferenceValues();
    }

    loadReferenceValues() {
        loadReferenceNames()
            .then(x => {
                this.setState({referenceNames: x})
            });
    }

    render() {
        return (
            <HashRouter>
                <Grid container>
                    <Grid item md={2}>
                        <List component="nav">
                            <ListItem button component="a" href="#/">
                                <ListItemIcon>
                                    <Add/>
                                </ListItemIcon>   
                                <Hidden smDown>
                                    <ListItemText>
                                        Add new
                                    </ListItemText>
                                </Hidden>
                            </ListItem>
                            <ListItem button component="a" href="#/test">
                                <ListItemIcon>
                                    <ListIcon/>
                                </ListItemIcon>
                                <Hidden smDown> 
                                    <ListItemText>
                                        List all
                                    </ListItemText>
                                </Hidden>
                            </ListItem>
                            <ListItem button component="a" href="#/stat">
                                <ListItemIcon>  
                                    <ChartIcon/>
                                </ListItemIcon> 
                                <Hidden smDown>
                                    <ListItemText>
                                        Statistics
                                    </ListItemText>
                                </Hidden>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={10}>
                        <Route 
                            path="/"
                            exact
                            render={(_) => <AddNew references={this.state.referenceNames}/>}
                        /> 
                    </Grid>                
                </Grid>
            </HashRouter>
        )
    }
}

export default App