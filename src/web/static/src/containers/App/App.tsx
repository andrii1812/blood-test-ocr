import * as React from "react";
import { IAppState } from "../../model";
import { AddNew } from "../AddNew";
import { Grid, List, ListItem, ListItemText, ListItemIcon, Hidden } from "@material-ui/core";
import Add from '@material-ui/icons/Add';
import ListIcon from "@material-ui/icons/List"
import ChartIcon from "@material-ui/icons/ShowChart"
import { connect } from "react-redux";
import { loadReferenceValues } from "./actions";
import LoadSingleTest from "../LoadSingleTest/LoadSingleTest";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import TestList from "../TestList/TestList";

interface IAppProps {
    references: string[],
    history: any,
    location: any,
    match: any,
    staticContext: any
    loadReferenceValues: () => void
}

const mapStateToProps = (state: IAppState) => ({
    references: state.references
})

const mapDispatchToProps = (dispatch: any) => ({
    loadReferenceValues: () => dispatch(loadReferenceValues())
})

const LoadTest = ({match}: {match: any}) => {
    return <LoadSingleTest id={match.params.id}/>
}

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
                            <ListItem button component="a" href="#/add">
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
                        <Switch>
                            <Route 
                                path="/add"
                                exact
                                component={AddNew}/>
                            <Route 
                                path='/test/:id'
                                component={LoadTest}/>
                            <Route
                                path='/test'
                                component={TestList}/>                            
                        </Switch>
                    </Grid>                
                </Grid>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))