import * as React from "react";
import {IAppState, initState, ingestImage, saveTest, loadReferenceNames} from '../model'
import FileSelect from "../components/FileSelect";
import urls from "../model/urls";
import ResultsDisplay from "../components/ResultsDisplay";
import './app.scss'
import { CssBaseline, Grid } from "@material-ui/core";

export default class App extends React.Component<{},IAppState> {

    constructor(props: IAppState) {
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

    fileSelected(file: File){        
        this.fetchResults(file);
    }

    fetchResults(file: File) {
        ingestImage(file)
        .then(x => {
            this.setState({
                ingestResults: x
            });
        });
    }

    save() {
        if (this.state.ingestResults) {
            saveTest(this.state.ingestResults);
        }
    }

    render() {
        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    <FileSelect selectSubmit={this.fileSelected.bind(this)}/>
                </Grid>
                {this.state.ingestResults && 
                    (<Grid item>
                        <ResultsDisplay 
                            data={this.state.ingestResults} 
                            references={this.state.referenceNames} 
                            save={this.save.bind(this)} />
                    </Grid>)
                }
            </Grid>                 
        )
    }
}