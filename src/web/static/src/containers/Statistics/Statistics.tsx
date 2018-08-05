import React = require("react");
import { Card, CardContent, Typography, Grid, CardHeader, Divider, Select, CardActions } from "@material-ui/core";
import { Translate } from "react-localize-redux";
import './stat.scss'
import { DatePicker, List, ListItem, RaisedButton } from "material-ui";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";

class Statistics extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    <Typography variant="title">
                        <Translate id="statistics.title">Statistics</Translate>
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Grid container spacing={16}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Typography variant="subheading">
                                <Translate id="statistics.dateRange">Date range</Translate>
                            </Typography>
                            <Grid container direction="column" spacing={16}>
                                <Grid item>
                                    <Grid container alignItems="baseline" className="date-container">
                                        <Grid item>
                                            <DatePicker className="datepicker" textFieldStyle={{width: '100%'}}/>
                                        </Grid>
                                        <Grid item className="to-label-container">                                    
                                            <div className="to-label">
                                                <Translate id="statistics.to">to</Translate>:
                                            </div>                                    
                                        </Grid>
                                        <Grid item>
                                            <DatePicker className="datepicker" textFieldStyle={{width: '100%'}}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="baseline">
                                        <Grid item className="tag-label-container">
                                            <Typography variant="body1">
                                                <Translate id="statistics.tag">Tag</Translate>:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Select className="tag-select">
                                                {"<!-- blank must be included-->"}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Typography variant="subheading">
                                <Translate id="statistics.addLine">Add Line</Translate>
                            </Typography>
                            <Grid container alignItems="baseline">
                                <Grid item>
                                    <Select className="tag-select"></Select>
                                </Grid>
                                <Grid item className="add-icon">
                                    <Add/>
                                </Grid>
                            </Grid>
                            <List>
                                <ListItem className="line-container">
                                    <Grid container>
                                        <Grid item>
                                            Test1
                                        </Grid>
                                        <Grid item>
                                            <svg style={{width: 300, height: 16}}>
                                                <line x1='20' y1='8' x2='300' y2='8' style={{stroke:'red', strokeWidth: '2'}}></line>
                                            </svg>
                                        </Grid>
                                        <Grid item>
                                            <Delete className="delete-line-icon"/>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Translate>
                      {({translate}) => <RaisedButton primary label={translate('statistics.generate')}/>}  
                    </Translate>
                </CardActions>
            </Card>
        )
    }
}

export default Statistics