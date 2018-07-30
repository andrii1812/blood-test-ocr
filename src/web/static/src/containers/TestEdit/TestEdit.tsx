import React = require("react");
import { IBloodTest } from "../../model";
import { Card, CardHeader, CardText, RaisedButton, MenuItem } from "material-ui";
import { CardActions, Grid, Typography, TextField, Select, Paper } from "@material-ui/core";
import { ImageView } from "../../components/imageView/ImageView";
import { connect } from "react-redux";
import { nameChanged, deleteEntry, valueChanged, saveTest, tagChanged } from "./actions";
import { namespacedAction } from "redux-subspace";
import PatchWarning from "../../components/patchWarning/PatchWarning";
import ReferencetextInput from "../../components/ReferenceTextInput";
import Delete from "@material-ui/icons/Delete";
import { Translate } from "react-localize-redux";
import './testEdit.scss'

interface ITestEditProps {
    data: IBloodTest,
    references: string[],
    tags: string[],
    title: string,
    save: () => void,
    nameChanged: (name: string, newName: string) => void,
    valueChanged: (name: string, value: string) => void
    deleteEntry: (name: string) => void,
    tagChanged: (tag: string) => void
}

const mapStateToProps = (state: IBloodTest, props: any) => ({
    data: state,
    ...props
})

const mapDispatchToProps = (dispatch: any, props: any) => ({
    save: () => dispatch(namespacedAction(props.namespace)(saveTest())),
    nameChanged: (name: string, newName: string) => dispatch(namespacedAction(props.namespace)(nameChanged({name, newName}))),
    valueChanged: (name: string, value: string) => dispatch(namespacedAction(props.namespace)(valueChanged({name, value}))),
    deleteEntry: (name: string) => dispatch(namespacedAction(props.namespace)(deleteEntry({name}))),
    tagChanged: (tag: string) => dispatch(namespacedAction(props.namespace)(tagChanged(tag)))
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
                                                onChange={this.props.nameChanged}/>
                                            </Grid>
                                        <Grid item>
                                            <TextField
                                                className="edit-input"
                                                id={name + '_value'} 
                                                value={value} 
                                                onChange={(e: any) => this.props.valueChanged(name, e.target.value)}/>
                                        </Grid>
                                        <Grid item onClick={() => this.props.deleteEntry(name)} className="actions-container">
                                                    <Delete className="delete-icon"/>
                                                
                                        </Grid>                                    
                                    </Grid>
                                </Grid>)
                            })}
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