import React = require("react");
import { IBloodTest } from "../../model";
import { Card, CardHeader, CardText, RaisedButton, MenuItem } from "material-ui";
import { CardActions, Grid, Typography, TextField, Select, Paper } from "@material-ui/core";
import { ImageView } from "../../components/imageView/ImageView";
import { connect } from "react-redux";
import { nameChanged, deleteEntry, valueChanged, saveTest, tagChanged, addNewEntry } from "./actions";
import { namespacedAction } from "redux-subspace";
import PatchWarning from "../../components/patchWarning/PatchWarning";
import ReferencetextInput from "../../components/ReferenceTextInput";
import Delete from "@material-ui/icons/Delete";
import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import { Translate } from "react-localize-redux";
import './testEdit.scss'

interface ITestEditProps {
    data: IBloodTest,
    references: string[],
    tags: string[],
    title: string,
    save: () => void,
    nameChanged: (index: number, newName: string) => void,
    valueChanged: (index: number, value: string) => void
    deleteEntry: (index: number) => void,
    tagChanged: (tag: string) => void,
    addNewEntry: (name: string, value: string) => void
}

const mapStateToProps = (state: IBloodTest, props: any) => ({
    data: state,
    ...props
})

const mapDispatchToProps = (dispatch: any, props: any) => ({
    save: () => dispatch(namespacedAction(props.namespace)(saveTest())),
    nameChanged: (index: number, newName: string) => dispatch(namespacedAction(props.namespace)(nameChanged({index, newName}))),
    valueChanged: (index: number, value: string) => dispatch(namespacedAction(props.namespace)(valueChanged({index, value}))),
    deleteEntry: (index: number) => dispatch(namespacedAction(props.namespace)(deleteEntry({index}))),
    tagChanged: (tag: string) => dispatch(namespacedAction(props.namespace)(tagChanged(tag))),
    addNewEntry: (name: string, value: string) => dispatch(namespacedAction(props.namespace)(addNewEntry({name, value}))),
})

class TestEdit extends React.Component<ITestEditProps> {
    
    state = {
        name: '',
        value: ''
    }

    constructor(props: any) {
        super(props);        
    }

    newNameChanged(name: string) {
        this.setState({name});
    }

    newValueChanged(value: string) {
        this.setState({value});
    }
    
    addNewEntry(name: string, value: string): any {
        if (!this.state.name || !this.state.value) {
            return;
        }

        this.props.addNewEntry(name, value);
        this.clearNewEntry();
    }

    clearNewEntry() {
        this.setState({name: '', value: ''});
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

    onTagChange(e: any) {
        this.props.tagChanged(e.target.value);
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
                                <Translate id="testEdit.overall">Overall information</Translate>
                            </Typography>                            
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>        
                            <Grid container spacing={8} direction="column">                                                                         
                                <Grid item>
                                    <Typography variant="body2">
                                        <Translate id="date">Date</Translate>: {this.props.data.date}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="baseline" spacing={16}>
                                        <Grid item>
                                            <Typography variant="body2">
                                                <Translate id="tag">Tag</Translate>:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Select value={this.props.data.tag} onChange={this.onTagChange.bind(this)} className="tag-select">
                                                {this.props.tags.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.props.data.patchId && <PatchWarning/>}
                                <Grid item>
                                    <Grid container spacing={16}>
                                        {this.props.data.images.map((x, i) => {                                            
                                            return (
                                                <Grid item key={i}>  
                                                    <Paper>                                  
                                                        <ImageView {...x}/>
                                                    </Paper>
                                                </Grid>
                                            )
                                        })}   
                                    </Grid>     
                                </Grid>                                                        
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={16}>                        
                        <Grid item md={3}>
                            <Typography variant="subheading">
                                <Translate id='testEdit.parsedValues'>Parsed values</Translate>
                            </Typography>                            
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Grid container direction='column'>
                            {this.props.data.values.map((x, index) => {
                                const name = x[0], value = x[1];
                                return (<Grid item key={index}>
                                    <Grid container spacing={8} alignItems="baseline" className="edit-container">                                
                                        <Grid item className="name-input">
                                            <ReferencetextInput                                            
                                                name={name} 
                                                value={name} 
                                                references={this.props.references}
                                                onChange={(_: string, newName: string) => this.props.nameChanged(index, newName)}/>
                                            </Grid>
                                        <Grid item>
                                            <TextField
                                                className="edit-input"
                                                id={name + '_value'} 
                                                value={value} 
                                                onChange={(e: any) => this.props.valueChanged(index, e.target.value)}/>
                                        </Grid>
                                        <Grid item onClick={() => this.props.deleteEntry(index)} className="actions-container">
                                                    <Delete className="delete-icon"/>                                                
                                        </Grid>                                    
                                    </Grid>
                                </Grid>)
                            })}
                                <Grid item>
                                    <Grid container spacing={8} alignItems="baseline" className="add-new-container">                                
                                        <Grid item className="name-input">
                                            <ReferencetextInput                                            
                                                name={this.state.name} 
                                                value={this.state.name} 
                                                references={this.props.references}
                                                onChange={(_: string, newName: string) => this.newNameChanged(newName)}/>
                                            </Grid>
                                        <Grid item>
                                            <TextField
                                                className="edit-input"
                                                id={name + '_value'} 
                                                value={this.state.value} 
                                                onChange={(e: any) => this.newValueChanged(e.target.value)}/>
                                        </Grid>
                                        <Grid item className="actions-container">
                                            <Add onClick={() => this.addNewEntry(this.state.name, this.state.value)} className="delete-icon"/> 
                                            {
                                                this.state.name && <Clear onClick={this.clearNewEntry.bind(this)} className="delete-icon"/>
                                            }                                               
                                        </Grid>                                    
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>                    
                </CardText>
                <CardActions>
                    <Translate>
                      {({translate}) => <RaisedButton primary label={translate('testEdit.save')} disabled={!this.isSaveEnabled()}  onClick={this.props.save}/>}  
                    </Translate>                        
                </CardActions>
            </Card>
        )
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(TestEdit)