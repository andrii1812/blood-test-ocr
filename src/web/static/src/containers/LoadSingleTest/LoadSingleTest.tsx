import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";
import {TestEdit} from "../TestEdit";
import { IAppState, IBloodTest } from "../../model";
import { connect } from "react-redux";
import { loadTest } from "./actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { namespacedAction } from "redux-subspace";
import { Translate } from "react-localize-redux";

interface ILoadSingleTestProps {
    references: string[],
    tags: string[],
    id: string,
    test: IBloodTest | null,
    loadTest: (id: string) => void
}

const mapStateToProps = (state: IAppState, props: any) => ({
    references: state.app.references,
    tags: state.app.tags,
    test: state.singleTest,
    ...props
})

const mapDispatchToProps = (dispatch: any) => ({
    loadTest: (id: string) => dispatch(namespacedAction('singleTest')(loadTest(id))),
})

class LoadSingleTest extends React.Component<ILoadSingleTestProps> {
    componentDidMount(){
        this.props.loadTest(this.props.id);
    }

    componentWillReceiveProps(newProps: ILoadSingleTestProps) {
        if (newProps.id !== this.props.id) {
            this.props.loadTest(newProps.id);
        }
    }
    
    render() {
        if (this.props.test === null) {
            return (
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress style={{margin: '0 auto'}}/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <SubspaceProvider mapState={(s: IAppState) => s.singleTest} namespace="singleTest">
                <Translate>
                    {({translate}) => <TestEdit 
                                            title={translate('singleTest')} 
                                            references={this.props.references}
                                            tags={this.props.tags}/>}
                </Translate>
            </SubspaceProvider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadSingleTest);