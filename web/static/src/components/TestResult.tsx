import React = require("react");
import { AutoComplete, TextField } from "material-ui";
import Grid from '@material-ui/core/Grid';
import ReferencetextInput from "./ReferenceTextInput";

interface ITestResultProps {
    name: string,
    value: string,
    references: string[],
    onNameChange: (name: string, newName: string) => void,
    onValueChange: (name: string, value: string) => void
}

export default class TestResult extends React.Component<ITestResultProps> {
    constructor(props: any) {
        super(props);
    }

    onNameChange(name: string, newName: string) {
        this.props.onNameChange(name, newName);
    }

    onValueChange(e: any) {
        this.props.onValueChange(this.props.name, e.target.value);
    }

    render() {
        return (
            <Grid container spacing={16} justify="flex-start" alignItems="center">
                <Grid item xs={6}>
                    <ReferencetextInput 
                        name={this.props.name} 
                        value={this.props.name} 
                        references={this.props.references}
                        onChange={this.onNameChange.bind(this)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField id={this.props.name + '_value'} value={this.props.value} onChange={this.onValueChange.bind(this)}/>
                </Grid>
            </Grid>
        )
    }
}