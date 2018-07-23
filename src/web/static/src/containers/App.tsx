import * as React from "react";
import { IAppState } from "../model";
import AddNew from "./AddNew";
import {Route} from 'react-router-dom';
import { Grid, List, ListItem, ListItemText, ListItemIcon, Hidden } from "@material-ui/core";
import Add from '@material-ui/icons/Add';
import ListIcon from "@material-ui/icons/List"
import ChartIcon from "@material-ui/icons/ShowChart"
import { connect } from "react-redux";
import { loadReferenceValues } from "../actions/references";



interface IAppProps {
    references: string[],
    loadReferenceValues: () => void
}

const mapStateToProps = (state: IAppState) => ({
    references: state.references
})

const mapDispatchToProps = (dispatch: any) => ({
    loadReferenceValues: () => dispatch(loadReferenceValues())
})

class App extends React.Component<IAppProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.loadReferenceValues();
    }

    render() {
        return (
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
                            component={AddNew}
                        /> 
                    </Grid>                
                </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)