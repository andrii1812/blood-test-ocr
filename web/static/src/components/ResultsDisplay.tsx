import React = require("react");
import { IBloodTest, IAppState } from "../model";
import { Card, CardHeader, CardText, RaisedButton, Divider, Table } from "material-ui";
import TestResult from "./testResult/TestResult";
import { CardActions, Grid, Typography, Paper } from "@material-ui/core";
import { ImageView } from "./imageView/ImageView";
import { saveTest } from "../actions/addNew/ingestFile";
import { connect } from "react-redux";
import { nameChanged, deleteEntry, valueChanged } from "../actions/addNew/editValues";

interface IResultDisplayProps {
    data: IBloodTest,
    references: string[],
    save: () => void,
    nameChanged: (name: string, newName: string) => void,
    valueChanged: (name: string, value: string) => void
    deleteEntry: (name: string) => void
}

const mapStateToProps = (state: IAppState) => ({
    data: state.addNew.editValues,
    references: state.references
})

const mapDispatchToProps = (dispatch: any) => ({
    save: () => dispatch(saveTest()),
    nameChanged: (name: string, newName: string) => dispatch(nameChanged({name, newName})),
    valueChanged: (name: string, value: string) => dispatch(valueChanged({name, value})),
    deleteEntry: (name: string) => dispatch(deleteEntry({name}))
})

class ResultsDisplay extends React.Component<IResultDisplayProps> {
    constructor(props: any) {
        super(props);
    }

    isSaveEnabled(): boolean {
        let enabled = true;
        for(let item of this.props.data.values) {
            if (this.props.references.indexOf(item[0]) === -1) {
                enabled = false;
            }
        }
        return enabled;
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <Typography variant="title">Parsed Results</Typography>
                </CardHeader>
                <CardText>    
                    <Grid container spacing={16}>                        
                        <Grid item md={3}>
                            <Typography variant="subheading">
                                Overall information
                            </Typography>                            
                        </Grid>
                        <Grid item md={9}>                                                                                
                            <Typography variant="body2">
                                Date: {this.props.data.date}
                            </Typography>
                    
                            {this.props.data.images.map((x, i) => {
                                return <ImageView key={i} {...x}/>
                            })}                                                                
                        </Grid>
                    </Grid>
                    <Grid container spacing={16}>                        
                        <Grid item md={3}>
                            <Typography variant="subheading">
                                Parsed values
                            </Typography>                            
                        </Grid>
                        <Grid item md={9}>
                            {this.props.data.values.map((x, index) => {
                                return <TestResult 
                                            key={index + '_test_result'} 
                                            name={x[0]} value={x[1]} 
                                            references={this.props.references}
                                            onNameChange={this.props.nameChanged}
                                            onValueChange={this.props.valueChanged}
                                            onDelete={this.props.deleteEntry}/>
                            })}      
                        </Grid>
                    </Grid>                    
                </CardText>
                <CardActions>
                    <RaisedButton primary label="save" disabled={!this.isSaveEnabled()}  onClick={this.props.save}/>
                </CardActions>
            </Card>
        )
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsDisplay)