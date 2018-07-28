import React = require("react");
import { IBloodTest, IAppState } from "../../model";
import { Card, CardHeader, CardText, RaisedButton, Divider, Table } from "material-ui";
import TestResult from "../../components/testResult/TestResult";
import { CardActions, Grid, Typography, Paper } from "@material-ui/core";
import { ImageView } from "../../components/imageView/ImageView";
import { connect } from "react-redux";
import { nameChanged, deleteEntry, valueChanged, saveTest } from "./actions";
import { namespacedAction } from "redux-subspace";
import Warning from '@material-ui/icons/Warning';
import PatchWarning from "../../components/patchWarning/PatchWarning";

interface ITestEditProps {
    data: IBloodTest,
    references: string[],
    title: string,
    save: () => void,
    nameChanged: (name: string, newName: string) => void,
    valueChanged: (name: string, value: string) => void
    deleteEntry: (name: string) => void
}

const mapStateToProps = (state: IBloodTest, props: any) => ({
    data: state,
    ...props
})

const mapDispatchToProps = (dispatch: any, props: any) => ({
    save: () => dispatch(namespacedAction(props.namespace)(saveTest())),
    nameChanged: (name: string, newName: string) => dispatch(namespacedAction(props.namespace)(nameChanged({name, newName}))),
    valueChanged: (name: string, value: string) => dispatch(namespacedAction(props.namespace)(valueChanged({name, value}))),
    deleteEntry: (name: string) => dispatch(namespacedAction(props.namespace)(deleteEntry({name})))
})

class TestEdit extends React.Component<ITestEditProps> {
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
                    <Typography variant="title">{this.props.title}</Typography>
                </CardHeader>
                <CardText>    
                    <Grid container spacing={16}>                        
                        <Grid item md={3}>
                            <Typography variant="subheading">
                                Overall information
                            </Typography>                            
                        </Grid>
                        <Grid item md={9}>        
                            <Grid container spacing={16} direction="column">                                                                         
                                <Grid item>
                                    <Typography variant="body2">
                                        Date: {this.props.data.date}
                                    </Typography>
                                </Grid>
                                {this.props.data.patchId && <PatchWarning/>}
                                <Grid item>
                                    {this.props.data.images.map((x, i) => {
                                        return <ImageView key={i} {...x}/>
                                    })}        
                                </Grid>                                                        
                            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestEdit)