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
                <Grid container direction="row" spacing={8}>
                    <Grid item>
                        <Warning className="warning-icon"/>
                    </Grid>
                    <Grid item className="warning-text">
                        <Translate id="patchWarning">The test with current date is already exists! The values below will be added to this test</Translate>
                    </Grid>
                </Grid>
            </Typography>
        </Paper>
    </Grid>
)