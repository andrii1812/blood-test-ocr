import { ITestImage } from '../../model';
import React = require('react');
import {Card, CardHeader, CardText, CardActions, RaisedButton} from 'material-ui';
import {Typography, Grid, Paper} from '@material-ui/core';
import { Translate } from "react-localize-redux";
import './imageSelect.scss';
import { ImageView } from '../imageView/ImageView';
import Done from '@material-ui/icons/Done';

interface IImageSelectProps {
    list: ITestImage[],
    selected: (images: ITestImage[]) => void
}

interface IImageSelectState {
    selected: ITestImage[]
}

export default class ImageSelect extends React.Component<IImageSelectProps, IImageSelectState> {
    state = {
        selected: []
    } as IImageSelectState

    isImageSelected = (image: ITestImage) => this.state.selected.indexOf(image) !== -1

    ImageSelectItem(image: ITestImage, i: number) {
        const selectedClass = () => this.isImageSelected(image) && "selected" || ''

        return (
        <Grid item key={i}>
            <Paper className={"image-select-container " + selectedClass()} > 
                <ImageView modalDisabled {...image} />
                <div className="select-field" onClick={() => this.toggleSelectImage(image)}>
                    <Done/>
                </div>
            </Paper>
        </Grid>
        )
    }

    toggleSelectImage(image: ITestImage) {
        const sel = [...this.state.selected];
        if (this.isImageSelected(image)) {
            const index = sel.indexOf(image);
            sel.splice(index, 1);
        } else {
            sel.push(image);
        }
        this.setState({selected: sel});
    }

    selectSubmit() {
        this.props.selected(this.state.selected);
        this.setState({selected: []});
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <Typography variant="title">
                        <Translate id='fileSelect.title'>Select image</Translate>
                    </Typography>
                </CardHeader>
                <CardText>
                    <Grid container spacing={16} wrap="wrap">
                        {this.props.list.map(this.ImageSelectItem.bind(this))}              
                    </Grid>                    
                </CardText>
                <CardActions>
                    <Translate>
                      {({translate}) => <RaisedButton primary label={translate('fileSelect.submit')} disabled={!this.state.selected.length} onClick={this.selectSubmit.bind(this)}/>}  
                    </Translate>             
                </CardActions>
            </Card>
        )
    }
}