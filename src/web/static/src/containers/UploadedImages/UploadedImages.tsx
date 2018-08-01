import React = require("react");
import { Grid, CircularProgress, Typography, Button } from "@material-ui/core";
import FileSelect from "../../components/FileSelect";
import { IUploadFile, IAppState, ITestImage } from "../../model";
import { Card, CardText, CardHeader, Paper } from "material-ui";
import { saveImage, loadImages, deleteImage } from "./actions";
import { connect } from "react-redux";
import { Translate } from "react-localize-redux";
import { ImageView } from "../../components/imageView/ImageView";
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { push } from "react-router-redux";
import Clear from "@material-ui/icons/Clear";

import './images.scss'

interface IUploadedImagesProps {
    images: ITestImage[] | null,
    isUpload: boolean
    isImagesLoaded: boolean
    saveFile: (file: IUploadFile) => void
    loadImages: () => void,
    parseExisting: (id: number) => void,
    remove: (image: ITestImage) => void,
}

interface IUploadedImagesState {
    file: IUploadFile | null
}

const mapStateToProps = (state: IAppState) => ({
    images: state.uploadedImages.images,
    isUpload: state.uploadedImages.upload,
    isImagesLoaded: state.uploadedImages.imagesLoaded
})

const mapDispatchToProps = (dispatch: any) => ({
    saveFile: (file: IUploadFile) => dispatch(saveImage(file)),
    loadImages: () => dispatch(loadImages()),
    parseExisting: (id: number) => id && dispatch(push('/parse/' + id.toString())),
    remove: (image: ITestImage) => image && dispatch(deleteImage(image))
})

class UploadedImages extends React.Component<IUploadedImagesProps, IUploadedImagesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: null
        }
    }

    componentDidMount() {
        this.props.loadImages();
    }

    fileSelected(file: IUploadFile) {
        this.setState({file});
    }

    submit() {
        if(this.state.file === null){
            return;            
        }

        this.props.saveFile(this.state.file);
    }

    render() {
        return (
            <Grid container spacing={16} direction="column" justify="flex-end">
                <Grid item>
                    <FileSelect fileSelected={this.fileSelected.bind(this)} submit={this.submit.bind(this)}/>
                </Grid>
                {(this.props.isUpload || !this.props.isImagesLoaded) && <CircularProgress style={{margin: '0 auto'}}/>}
                {(this.props.isImagesLoaded) && 
                <Grid item>
                    <Card>
                        <CardHeader>
                            <Typography variant="title">
                                <Translate id='uploadedImages.title'>Uploaded Images</Translate>
                            </Typography>
                        </CardHeader>
                        <CardText>
                            <Grid container spacing={16} wrap="wrap">
                            {this.props.images && this.props.images.map((image, index) =>
                                <Grid item key={index}>
                                    <Paper>                                        
                                        <ImageView {...image}/>
                                        <Grid container justify="flex-end" className="image-actions-container">
                                            <Grid item className="image-action">                     
                                                <AddToPhotos onClick={() => image.id && this.props.parseExisting(image.id)}/>                                                   
                                            </Grid>
                                            <Grid item className="image-action" onClick={() => image.id && this.props.remove(image)}>
                                                <Clear/>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            )}
                            {this.props.images && !this.props.images.length && 
                                <Grid item style={{margin: '0 auto'}}>
                                    <Typography variant="subheading" style={{color: '#9E9E9E'}}>
                                        <Translate id='uploadedImages.noImages'>
                                            No images uploaded
                                        </Translate>
                                    </Typography>                                
                                </Grid>
                            }      
                            </Grid>
                        </CardText>
                    </Card>
                </Grid>                
                }
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedImages)