import * as React from "react";
import {IAddNewState, initState, ingestImage, saveTest, loadReferenceNames, getAddNewInitialState} from '../model'
import FileSelect from "../components/FileSelect";
import ResultsDisplay from "../components/ResultsDisplay";
import './app.scss'
import { Grid, CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router";

interface IAddNewProps {
    references: string[]
}

export default class AddNew extends React.Component<IAddNewProps, IAddNewState> {
    state = getAddNewInitialState()

    constructor(props: IAddNewProps) {
        super(props);
        //this.fetchTest();
    }

    fileSelected(file: File){        
        this.fetchResults(file);
    }

    fetchResults(file: File) {
        this.setState({loading: true})
        ingestImage(file)
            .then(x => {
                this.setState({ingestResults: x, loading: false});
            });
    }

    fetchTest() {
        fetch('test/1').then(x=> x.json()).then(x => {
            this.setState({ingestResults: x, loading: false});
        });
    }

    save() {
        if (this.state.ingestResults) {
            saveTest(this.state.ingestResults).then((x: string) => {
                this.setState({saveId: x})
            })
        }
    }

    render() {
        if(this.state.saveId !== null) {
            return <Redirect to={'/test/' + this.state.saveId}/>
        }

        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    <FileSelect selectSubmit={this.fileSelected.bind(this)}/>
                </Grid>
                {
                    this.state.loading && <CircularProgress style={{margin: '0 auto'}}/>
                }
                {this.state.ingestResults && 
                    (<Grid item>
                        <ResultsDisplay
                            data={this.state.ingestResults} 
                            references={this.props.references} 
                            save={this.save.bind(this)} />
                    </Grid>)
                }
            </Grid>                 
        )
    }
}