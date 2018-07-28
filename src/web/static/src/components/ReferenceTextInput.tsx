import React = require("react");
import { MenuItem } from "material-ui";
import { FormControl, FormHelperText, Select } from "@material-ui/core";
import { Translate } from "react-localize-redux";

interface IReferencetextInputProps {
    name: string;
    value: string;
    references: string[];
    onChange: (name: string, newName: string) => void
}

export default class ReferencetextInput extends React.Component<IReferencetextInputProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        }
    }

    isValid() {
        return this.props.references.indexOf(this.props.value) !== -1;
    }

    onChange(e: any) {
        this.props.onChange(this.props.name, e.target.value);
    }

    render() {
        return (
            <FormControl error={!this.isValid()}>
                <Select 
                    value={this.props.value} onChange={this.onChange.bind(this)} className="edit-input">
                    {
                        this.props.references.map((x, i) => {
                            return <MenuItem key={i} value={x}>{x}</MenuItem>
                        })
                    }
                    {
                        !this.isValid() &&
                            <MenuItem value={this.props.value}>{this.props.value}</MenuItem>                        
                    }
                </Select>
                {!this.isValid() && <FormHelperText><Translate id="invalidValue">Invalid value</Translate></FormHelperText>}
            </FormControl>            
        )
    }
}