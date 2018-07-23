import * as React from "react";
import {IBloodTest, IAppState} from '../model'
import FileSelect from "../components/FileSelect";
import ResultsDisplay from "../components/ResultsDisplay";
import './app.scss'
import { Grid, CircularProgress } from "@material-ui/core";
import { ingestFile, saveTest } from "../actions/addNew/ingestFile";
import { connect } from "react-redux";

interface IAddNewProps {
    references: string[],
    ingestResults: IBloodTest,
    loading: boolean
    ingestFile: () => void
}

const mapStateToProps = (state: IAppState) => ({
    ingestResults: state.addNew.editValues,
    loading: state.addNew.ingestFile.loading,
    references: state.references
})

const mapDispatchToProps = (dispatch: any) => ({
    ingestFile: () => dispatch(ingestFile())
})

class AddNew extends React.Component<IAddNewProps> {
    constructor(props: IAddNewProps) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    <FileSelect />
                </Grid>
                {
                    this.props.loading && <CircularProgress style={{margin: '0 auto'}}/>
                }
                {this.props.ingestResults && 
                    (<Grid item>
                        <ResultsDisplay/>
                    </Grid>)
                }
            </Grid>                 
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNew)