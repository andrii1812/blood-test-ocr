import * as React from "react";
import {State, initState, IngestResult} from '../model/state'
import FileSelect from "../components/FileSelect";
import urls from "../model/urls";
import ResultsDisplay from "../components/ResultsDisplay";
import { Divider } from "material-ui";

export default class App extends React.Component<{},State> {
    
    loadReferenceValues(): any {
        fetch(urls.REFERENCE_NAMES)
            .then(x => x.json())
            .then(x => {this.setState({...this.state, referenceNames: x})})
    }

    constructor(props: State) {
        super(props);
        this.state = initState();
        this.loadReferenceValues();       
    }

    fileSelected(file: File){        
        this.fetchResults(file);
    }

    fetchResults(file: File) {
        const data = new FormData();
        data.append('image', file);

        fetch(urls.INGEST_IMAGE, {
            method: 'POST',
            body: data
        })
        .then(r => r.json())
        .then(x => {
            this.setState({
                ...this.state,
                ingestResults: {...x.test, url: x.url}
            });
        });
    }

    render() {
        return (   
            <div className="app">
                <FileSelect selectSubmit={this.fileSelected.bind(this)}/>    
                <Divider/>            
                <ResultsDisplay />
            </div>         
            //data={this.state.ingestResults} references={this.state.referenceNames} />}
        )
    }
}