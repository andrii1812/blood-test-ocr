import { ITestImage } from "../../model";
import { Grid, Paper } from "@material-ui/core";
import { ImageView } from "../../components/imageView/ImageView";
import Add from '@material-ui/icons/Add';
import './imageListView.scss'
import React = require("react");


interface IImageListViewProps {
    images: ITestImage[]
}

export default (props: IImageListViewProps) => {
    return (
        <Grid container spacing={16}>
            {props.images.map((x, i) => {                                     
                return (
                    <Grid item key={i}>  
                        <Paper>                                  
                            <ImageView {...x}/>
                        </Paper>
                    </Grid>
                )
            })}
            {/* <Grid item>  
                <Paper>
                    <div className='add-container'>
                        <Add className='add-image-icon'/>
                    </div>                              
                </Paper>
            </Grid> */}
        </Grid>
    )
}