import React = require("react");
import { Grid, Card, CardHeader, Typography } from "@material-ui/core";
import { CardTitle } from "material-ui";
import { Translate } from "react-localize-redux";
import Error from '@material-ui/icons/Error'

export default (_: any) => (
    <Grid item>
        <Card style={{borderColor: '#f44336', borderWidth: 2, borderStyle: 'solid'}}>
            <CardTitle>
                <Grid container justify="center">
                    <Grid item>
                        <Grid container justify="center" style={{color: '#f44336'}}>
                            <Grid item>
                                <Error/>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" style={{color: '#f44336'}}>
                                    <Translate id='parseFailed'>Parse Failed</Translate>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>                
            </CardTitle>
        </Card>        
    </Grid>
)