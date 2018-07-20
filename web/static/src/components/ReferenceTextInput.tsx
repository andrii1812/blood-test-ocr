import React = require("react");
import { TextField } from "material-ui";

interface IReferencetextInputProps {
    name: string;
    value: string;
    references: string[];
}

export default class ReferencetextInput extends React.Component<IReferencetextInputProps> {
    constructor(props: any) {
        super(props);
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

    render() {
        return (
            <TextField errorText={this.getErrorText()} name={this.props.name} value={this.props.value} />
        )
    }
}