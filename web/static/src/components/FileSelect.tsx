import * as React from "react";
import { Card, CardHeader, CardText, CardActions, RaisedButton } from "material-ui";
import Typography from "@material-ui/core/Typography";
import { fileSelected, ingestFile } from "../actions/addNew/ingestFile";
import { connect } from "react-redux";
import { IUploadFile } from "../model";

interface IFileSelectProps {
    fileSelected: (file: IUploadFile) => void,
    submit: () => void
}

const mapDispatchToProps = (dispatch: any) => ({
    fileSelected: (file: IUploadFile) => dispatch(fileSelected(file)),
    submit: () => dispatch(ingestFile())
})

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
                    <Typography variant="title">Input File</Typography>
                </CardHeader>
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

export default connect(null, mapDispatchToProps)(FileSelect);