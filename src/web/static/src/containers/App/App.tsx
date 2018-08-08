import * as React from "react";
import { IAppState, IAppValuesState } from "../../model";
import { AddNew } from "../AddNew";
import { Grid, Hidden, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { loadReferenceValues, loadTags } from "./actions";
import LoadSingleTest from "../LoadSingleTest/LoadSingleTest";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import TestList from "../TestList/TestList";
import NavList from "../../components/NavList/NavList";
import { withLocalize, LocalizeContextProps } from "react-localize-redux";
import translations from '../../translation/translation';
import {renderToStaticMarkup} from 'react-dom/server';
import UploadedImages from "../UploadedImages/UploadedImages";
import ParseExisting from "../ParseExisting/ParseExisting";
import Statistics from "../Statistics/Statistics";
import TopBar from "../../components/TopBar/TopBar";

interface IAppProps extends LocalizeContextProps {
    data: IAppValuesState,
    history: any,
    location: any,
    match: any,
    staticContext: any
    loadReferenceValues: () => void,
    loadTags: () => void
}

const mapStateToProps = (state: IAppState) => ({
    data: state.app
})

const mapDispatchToProps = (dispatch: any) => ({
    loadReferenceValues: () => dispatch(loadReferenceValues()),
    loadTags: () => dispatch(loadTags())
})

const LoadTest = ({match}: {match: any}) => {
    return <LoadSingleTest id={match.params.id}/>
}

class App extends React.Component<IAppProps> {
    constructor(props: any) {
        super(props);

        const languages = [
            {name: 'English', code: 'EN'},
            {name: 'Ukrainian', code: 'UA'}
        ];

        this.props.initialize({
            languages: languages,
            translation: translations,
            options: {
                renderToStaticMarkup,
                defaultLanguage: 'EN'
            }
        });
    }

    componentDidMount() {
        this.props.loadReferenceValues();
        this.props.loadTags();
    }

    render() {
        if (!this.props.data.references || ! this.props.data.tags) {
            return (
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress style={{margin: '0 auto'}}/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div style={{height: '100%'}}>                                       
                <Grid container>
                    <Hidden smDown>
                        <Grid item md={2}>
                            <NavList/>
                        </Grid>
                    </Hidden>
                    <Grid item sm={12} md={10} xs={12} style={{paddingLeft: 8}}>
                        <TopBar/>
                        <Switch>
                            <Route 
                                path="/"
                                exact
                                component={UploadedImages}/>
                            <Route 
                                path="/parse/:id"                                
                                component={ParseExisting}/>
                            <Route 
                                path="/add"
                                component={AddNew}/>
                            <Route 
                                path='/test/:id'
                                component={LoadTest}/>
                            <Route
                                path='/test'
                                component={TestList}/> 
                            <Route
                                path='/stat'
                                component={Statistics}/>
                        </Switch>
                    </Grid>                
                </Grid>
            </div>
        )
    }
}

export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))
