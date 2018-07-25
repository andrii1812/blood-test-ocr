import * as React from "react";
import {IBloodTest, IAppState, IUploadFile, IAddNewState} from '../../model'
import FileSelect from "../../components/FileSelect";
import TestEdit from "../TestEdit/TestEdit";
import { Grid, CircularProgress } from "@material-ui/core";
import { ingestFile, fileSelected } from "./actions";
import { connect } from "react-redux";
import { SubspaceProvider } from "react-redux-subspace";

interface IAddNewProps {
    references: string[],
    ingestResults: IBloodTest | null,
    loading: boolean
    ingestFile: () => void,
    fileSelected: (file: IUploadFile) => void
}

const mapStateToProps = (state: IAppState) => ({
    ingestResults: state.addNew.editValues,
    loading: state.addNew.ingestFile.loading,
    references: state.references
})

const mapDispatchToProps = (dispatch: any) => ({
    ingestFile: (): void => dispatch(ingestFile()),
    fileSelected: (file: IUploadFile): void => dispatch(fileSelected(file)),
})

class AddNew extends React.Component<IAddNewProps> {
    constructor(props: IAddNewProps) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    <FileSelect fileSelected={this.props.fileSelected} submit={this.props.ingestFile}/>
                </Grid>
                {
                    this.props.loading && <CircularProgress style={{margin: '0 auto'}}/>
                }
                {this.props.ingestResults && 
                    (<Grid item>
                        <SubspaceProvider mapState={(s: IAppState) => s.addNew.editValues} namespace="editValues">
                            <TestEdit title="Parsed Results" references={this.props.references}/>
                        </SubspaceProvider>
                    </Grid>)
                }
            </Grid>                 
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNew)