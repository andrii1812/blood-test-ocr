import * as React from "react";
import {IBloodTest, IAppState, IUploadFile, TestEditLoading } from '../../model'
import FileSelect from "../../components/FileSelect";
import TestEdit from "../TestEdit/TestEdit";
import { Grid, CircularProgress } from "@material-ui/core";
import { ingestFile, fileSelected } from "./actions";
import { connect } from "react-redux";
import { SubspaceProvider } from "react-redux-subspace";
import { Translate } from "react-localize-redux";
import { clearTest } from "../TestEdit/actions";
import { namespacedAction } from "redux-subspace";
import ParseFailed from "../../components/ParseFailed";

interface IAddNewProps {
    references: string[],
    tags: string[],
    ingestResults: IBloodTest | null,
    loadState: TestEditLoading
    ingestFile: () => void,
    fileSelected: (file: IUploadFile) => void,
    clearTest: () => void
}

const mapStateToProps = (state: IAppState) => ({
    ingestResults: state.addNew.editValues.test,
    loadState: state.addNew.editValues.state,
    references: state.app.references,
    tags: state.app.tags,
})

const mapDispatchToProps = (dispatch: any) => ({
    ingestFile: (): void => dispatch(ingestFile()),
    fileSelected: (file: IUploadFile): void => dispatch(fileSelected(file)),
    clearTest: () => dispatch(namespacedAction('editValues')(clearTest()))
})

class AddNew extends React.Component<IAddNewProps> {
    constructor(props: IAddNewProps) {
        super(props);
    }

    componentDidMount(){
        this.props.clearTest();
    }

    render() {
        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    <FileSelect fileSelected={this.props.fileSelected} submit={this.props.ingestFile}/>
                </Grid>
                {
                    this.props.loadState === TestEditLoading.LOAD_FAILURE && <ParseFailed/>
                }
                {
                    this.props.loadState === TestEditLoading.LOADING && <CircularProgress style={{margin: '0 auto'}}/>
                }
                {this.props.loadState === TestEditLoading.LOAD_SUCCESS && 
                    (<Grid item>
                        <SubspaceProvider mapState={(s: IAppState) => s.addNew.editValues.test} namespace="editValues">
                            <Translate>
                                {({translate}) => <TestEdit 
                                                        title={translate('parsedResults')} 
                                                        references={this.props.references}
                                                        tags={this.props.tags}/>}
                            </Translate>
                        </SubspaceProvider>
                    </Grid>)
                }
            </Grid>                 
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNew)