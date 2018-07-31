import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";
import {TestEdit} from "../TestEdit";
import { IAppState, IBloodTest, TestEditLoading } from "../../model";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { namespacedAction } from "redux-subspace";
import { Translate } from "react-localize-redux";
import { loadTest } from "../TestEdit/actions";
import ParseFailed from "../../components/ParseFailed";

interface ILoadSingleTestProps {
    references: string[],
    tags: string[],
    id: string,
    test: IBloodTest | null,
    loadState: TestEditLoading
    loadTest: (id: string) => void
}

const mapStateToProps = (state: IAppState, props: any) => ({
    references: state.app.references,
    tags: state.app.tags,
    test: state.singleTest.test,
    loadState: state.singleTest.state,
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
        if (this.props.loadState === TestEditLoading.LOADING || this.props.loadState === TestEditLoading.INITIAL) {
            return (
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress style={{margin: '0 auto'}}/>
                    </Grid>
                </Grid>
            )
        }


        if (this.props.loadState === TestEditLoading.LOAD_FAILURE) {
            return <ParseFailed/>
        }

        return (
            <SubspaceProvider mapState={(s: IAppState) => s.singleTest.test} namespace="singleTest">
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