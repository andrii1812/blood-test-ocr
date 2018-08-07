import React = require("react");
import { MenuItem } from "material-ui";
import { FormControl, FormHelperText, Select, TextField } from "@material-ui/core";
import { Translate } from "react-localize-redux";

interface IReferencetextInputProps {
    name: string;
    value: string;
    references: string[];
    onChange: (name: string, newName: string) => void
}

export default class ReferencetextInput extends React.Component<IReferencetextInputProps> {

    constructor(props: any) {
        super(props);
    }

    isValid() {
        return this.props.references.indexOf(this.props.value) !== -1;
    }

    onChange(e: any) {
        this.props.onChange(this.props.name, e.target.value);
    }

    render() {
        let references = this.props.references;

        return (
            <FormControl error={!this.isValid()}>
                <Select 
                    value={this.props.value} 
                    onChange={this.onChange.bind(this)} 
                    className="edit-input">                                    
                    {
                        references.map((x, i) => {
                            return <MenuItem key={i} value={x}>{x}</MenuItem>
                        })
                    }
                    {
                        !this.isValid() &&
                            <MenuItem style={{display: 'none'}} value={this.props.value}>{this.props.value}</MenuItem>                        
                    }
                </Select>
                {!this.isValid() && <FormHelperText><Translate id="invalidValue">Invalid value</Translate></FormHelperText>}
            </FormControl>            
        )
    }
}