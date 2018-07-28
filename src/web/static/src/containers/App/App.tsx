import * as React from "react";
import { IAppState } from "../../model";
import { AddNew } from "../AddNew";
import { Grid, Hidden } from "@material-ui/core";
import { connect } from "react-redux";
import { loadReferenceValues } from "./actions";
import LoadSingleTest from "../LoadSingleTest/LoadSingleTest";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import TestList from "../TestList/TestList";
import NavList from "../../components/NavList";
import { withLocalize, LocalizeContextProps } from "react-localize-redux";
import translations from '../../translation/translation';
import TopBar from "../../components/TopBar";
import {renderToStaticMarkup} from 'react-dom/server';

interface IAppProps extends LocalizeContextProps {
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
    }

    render() {
        return (
            <div>
                <TopBar/>
                <Grid container style={{paddingTop: 8}}>
                    <Hidden smDown>
                        <Grid item md={2}>
                            <NavList/>
                        </Grid>
                    </Hidden>
                    <Grid item sm={12} md={10} xs={12}>
                        <Switch>
                            <Route 
                                path="/"
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
            </div>
        )
    }
}

export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))
