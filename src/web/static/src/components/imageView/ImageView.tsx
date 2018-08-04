import React = require("react");
import { ITestImage, getScaledHeight, getScaledWidth } from "../../model";
import { Modal, Paper } from "@material-ui/core";
import NewTab from '@material-ui/icons/Launch'
import './imageView.scss'
import Clear from "@material-ui/icons/Clear";

interface IImageViewState {
    open: boolean
}

export class ImageView extends React.Component<ITestImage, IImageViewState> {    
    width = 120;
    state = {
        open: false
    }

    constructor(props: any) {
        super(props);
    }

    openModal() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        const height = window.innerHeight;
        let modalWidth = getScaledWidth(this.props, height);
        let modalHeight = height;

        if (modalWidth > window.innerWidth) {
            modalWidth = window.innerWidth;
            modalHeight = getScaledHeight(this.props, modalWidth);
        }
        
        return (
            <div className="image-view-container">
                <div onClick={this.openModal.bind(this)}>
                    <img src={this.props.path} width={this.width} height={getScaledHeight(this.props, this.width)}/>
                </div>
                <a className="open-new-tab-icon" href={this.props.path} target="_blank">
                    <NewTab/>
                </a>
                <Modal 
                    open={this.state.open} 
                    onClose={this.handleClose.bind(this)}>
                    <div onClick={this.handleClose.bind(this)} className="modal-body" style={{width: modalWidth}}>
                        <div className="close-button">
                            <Clear className="close-icon"/>    
                        </div>
                        <img src={this.props.path} width={modalWidth} height={modalHeight}/>
                    </div>
                </Modal>
            </div>
        )
    }
}