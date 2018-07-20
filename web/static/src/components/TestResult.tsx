import React = require("react");
import { AutoComplete, TextField } from "material-ui";
import Grid from '@material-ui/core/Grid';
import ReferencetextInput from "./ReferenceTextInput";

interface ITestResultProps {
    name: string,
    value: string,
    references: string[]
}

export default class TestResult extends React.Component<ITestResultProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={6} spacing={8}>
                    <ReferencetextInput name={this.props.name} value={this.props.name} references={this.props.references}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField id={this.props.name + '_value'} value={this.props.value}/>
                </Grid>
            </Grid>
        )
    }
}