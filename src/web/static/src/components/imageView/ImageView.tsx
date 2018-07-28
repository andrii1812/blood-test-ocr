import React = require("react");
import { ITestImage, getScaledHeight } from "../../model";
import { Modal, Paper } from "@material-ui/core";
import './imageView.scss'

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
        return (
            <Paper>
                <div onClick={this.openModal.bind(this)}>
                    <img src={this.props.path} width={this.width} height={getScaledHeight(this.props, this.width)}/>
                </div>
                <Modal 
                    open={this.state.open} 
                    onClose={this.handleClose.bind(this)}>
                    <div onClick={this.handleClose.bind(this)} className="modal-body">
                        <img src={this.props.path} width={600} height={getScaledHeight(this.props, 600)}/>
                    </div>
                </Modal>
            </Paper>
        )
    }
}