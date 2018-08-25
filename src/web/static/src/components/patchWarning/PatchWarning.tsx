import React = require("react");
import { Paper } from "material-ui";
import { Typography, Grid } from "@material-ui/core";
import Warning from "@material-ui/icons/Warning";
import './patchWarning.scss'
import { Translate } from "react-localize-redux";

export default (_: any) => (
    <Grid item>
        <Paper className="warning-container">
            <Typography variant="subheading">
                <Warning className="warning-icon"/>
                <span className="warning-text">
                    <Translate id="patchWarning">The test with current date is already exists! The values below will be added to this test</Translate>
                </span>
            </Typography>
        </Paper>
    </Grid>
)