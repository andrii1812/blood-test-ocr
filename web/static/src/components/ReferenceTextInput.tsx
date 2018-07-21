import React = require("react");
import { TextField, MenuItem } from "material-ui";
import { FormControl, InputLabel, Input, FormHelperText, Select } from "@material-ui/core";

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

    getErrorText(): string {
        if (this.isValid()) {
            return '';
        }

        return 'Invalid value';
    }

    onChange(e: any) {
        this.props.onChange(this.props.name, e.target.value);
    }

    render() {
        return (
            <FormControl error={!this.isValid()} aria-describedby="name-error-text">
                <Select id={this.props.name} value={this.props.value} style={{width: 256}} onChange={this.onChange.bind(this)}>
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
                {!this.isValid() && <FormHelperText id="name-error-text">Invalid value</FormHelperText>}
            </FormControl>            
        )
        //<TextField errorText={this.getErrorText()} name={this.props.name} value={this.props.value} />
    }
}