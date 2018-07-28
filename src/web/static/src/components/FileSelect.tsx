import * as React from "react";
import { Card, CardHeader, CardText, CardActions, RaisedButton } from "material-ui";
import Typography from "@material-ui/core/Typography";
import { IUploadFile } from "../model";
import { Translate } from "react-localize-redux";

interface IFileSelectProps {
    fileSelected: (file: IUploadFile) => void,
    submit: () => void
}

class FileSelect extends React.Component<IFileSelectProps> {    
    constructor(props: IFileSelectProps){
        super(props);
    }

    selectSubmit() {
        this.props.submit();
    }

    handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const url = window.URL.createObjectURL(file);

        this.props.fileSelected({url, filename: file.name});
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <Typography variant="title">
                        <Translate id='fileSelect.title'>Input File</Translate>
                    </Typography>
                </CardHeader>
                <CardText>
                    <input type='file' onChange={this.handleFileChange.bind(this)}/>
                </CardText>
                <CardActions>
                    <Translate>
                      {({translate}) => <RaisedButton primary label={translate('fileSelect.submit')} onClick={this.selectSubmit.bind(this)}/>}  
                    </Translate>
                </CardActions>
            </Card>
        )
    }
}

export default FileSelect;