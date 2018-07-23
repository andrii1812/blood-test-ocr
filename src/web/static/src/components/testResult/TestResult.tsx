import React = require("react");
import { AutoComplete, TextField } from "material-ui";
import Grid from '@material-ui/core/Grid';
import ReferencetextInput from "../ReferenceTextInput";
import './testResult.scss'
import { Button } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete"

interface ITestResultProps {
    name: string,
    value: string,
    references: string[],
    onNameChange: (name: string, newName: string) => void,
    onValueChange: (name: string, value: string) => void,
    onDelete: (name: string) => void
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

    delete() {
        this.props.onDelete(this.props.name);
    }

    render() {
        return (
            <div className="result-container">
                <div className="result-item">
                    <ReferencetextInput 
                        name={this.props.name} 
                        value={this.props.name} 
                        references={this.props.references}
                        onChange={this.onNameChange.bind(this)}/>
                </div>
                <div className="result-item">
                    <TextField id={this.props.name + '_value'} value={this.props.value} onChange={this.onValueChange.bind(this)}/>
                </div>
                <div className="delete-button-container">
                    <div className="delete-button" onClick={this.delete.bind(this)}>
                        <Delete className="delete-icon"/>
                    </div>
                </div>
            </div>
        )
    }
}