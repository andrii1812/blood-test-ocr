import React = require("react");
import { MenuItem } from "material-ui";
import { FormControl, FormHelperText, Select, TextField } from "@material-ui/core";
import { Translate } from "react-localize-redux";
import { ISortable, sortAsc, findIndexByName } from "../model";

interface IReferencetextInputProps {
    name: string;
    value: string;
    references: ISortable[];
    validationDisabled?: boolean
    onChange: (name: string, newName: string) => void
}

export default class ReferencetextInput extends React.Component<IReferencetextInputProps> {

    constructor(props: any) {
        super(props);
    }

    isValid() {
        return this.props.validationDisabled || !this.props.validationDisabled && findIndexByName(this.props.references, this.props.value) !== -1;
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
                        sortAsc(references).map((x, i) => {
                            return <MenuItem key={i} value={x.name}>{x.name}</MenuItem>
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