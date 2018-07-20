import * as React from "react";
import { Card, CardHeader, CardText, CardActions, RaisedButton } from "material-ui";

interface IFileSelectProps {
    selectSubmit: (file: File) => void
}

class FileSelect extends React.Component<IFileSelectProps> {
    file: File | null;
    
    constructor(props: IFileSelectProps){
        super(props);
        this.file = null;
    }

    selectSubmit() {
        if (!this.file) {
            return;
        }

        this.props.selectSubmit(this.file);
    }

    handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        this.file = e.target.files[0];        
    }

    render() {
        return (
            <Card>
                <CardHeader title="Upload file"/>
                <CardText>
                    <input type='file' onChange={this.handleFileChange.bind(this)}/>
                </CardText>
                <CardActions>
                    <RaisedButton primary label="Submit" onClick={this.selectSubmit.bind(this)}/>
                </CardActions>
            </Card>
        )
    }
}

export default FileSelect;