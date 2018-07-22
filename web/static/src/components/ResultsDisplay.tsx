import React = require("react");
import { IBloodTest } from "../model";
import { Card, CardHeader, CardText, RaisedButton, Divider, Table } from "material-ui";
import TestResult from "./testResult/TestResult";
import { CardActions, Grid, Typography, Paper } from "@material-ui/core";
import { ImageView } from "./imageView/ImageView";

interface IResultDisplayProps {
    data: IBloodTest,
    references: string[],
    save: () => void
}

export default class ResultsDisplay extends React.Component<IResultDisplayProps> {
    constructor(props: any) {
        super(props);
    }

    onNameChange(name: string, newName: string) {
        let value = this.findValue(name);
        value[0] = newName;    
        this.setState({...this.state});
    }

    onValueChange(name: string, value:string) {
        let valueObj = this.findValue(name);
        valueObj[1] = value;        
        this.setState({...this.state});
    }

    findValue(name: string) {
        let index = this.props.data.values.findIndex(x => x[0] === name);
        return this.props.data.values[index];
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

    save() {
        this.props.save();
    }

    delete(name: string) {
        let index = this.props.data.values.findIndex(x => x[0] === name);
        this.props.data.values.splice(index, 1);
        this.setState({...this.state});
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
                    
                            {this.props.data.images.map(x => {
                                return <ImageView {...x}/>
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
                                            onNameChange={this.onNameChange.bind(this)}
                                            onValueChange={this.onValueChange.bind(this)}
                                            onDelete={this.delete.bind(this)}/>
                            })}      
                        </Grid>
                    </Grid>                    
                </CardText>
                <CardActions>
                    <RaisedButton primary label="save" disabled={!this.isSaveEnabled()}  onClick={this.save.bind(this)}/>
                </CardActions>
            </Card>
        )
    }   
}