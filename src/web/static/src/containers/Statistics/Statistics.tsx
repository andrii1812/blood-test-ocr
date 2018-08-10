import React = require("react");
import { Card, CardContent, Typography, Grid, CardHeader, Divider, Select, CardActions, MenuItem, CircularProgress } from "@material-ui/core";
import { Translate } from "react-localize-redux";
import './stat.scss'
import { DatePicker, List, ListItem, RaisedButton, LinearProgress } from "material-ui";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import DateGraph from '../../components/DateGraph/DateGraph'
import { IAppState, ILoading, IGraphResponse, IGraphRequest, Line, ILoadingState } from "../../model";
import { connect } from "react-redux";
import { generateGraph } from "./actions";
const randomColor = require('randomcolor');

interface IStatisticsProps {
    tags: string[],
    references: string[],
    graph: ILoading<IGraphResponse>,
    generateGraph: (request: IGraphRequest) => void
}

interface IStatisticsState {
    from: Date | undefined,
    to: Date | undefined,
    lines: Line[],
    tag?: string,
    newLine: string
}

const mapStateToProps = (state: IAppState) => ({
    tags: state.app.tags,
    references: state.app.references,
    graph: state.statistics
})

const mapDispatchToProps = (dispatch: any) => ({
    generateGraph: (request: IGraphRequest) => dispatch(generateGraph(request))
})

class Statistics extends React.Component<IStatisticsProps, IStatisticsState> {
    state = {
        from: undefined,
        to: undefined,
        lines: [],
        tag: '',
        newLine: ''
    }

    Line = (line: Line, i: number) => (
        <ListItem className="line-container" key={i}>
            <Grid container>
                <Grid item xs={5} sm={5}>
                    {line.name}
                </Grid>
                <Grid item xs={6} sm={6}>
                    <svg style={{width: '100%', height: 16}}>
                        <line x1='20' y1='8' x2='300' y2='8' style={{stroke: line.color, strokeWidth: '2'}}></line>
                    </svg>
                </Grid>
                <Grid item xs={1} sm={1}>
                    <Delete className="delete-line-icon" onClick={() => this.deleteItem(i)}/>
                </Grid>
            </Grid>
        </ListItem>
    )

    dateChanged(name: string) {
        return (_: any, date: Date) => {
            console.log(date);
            const update: any = {};
            update[name] = date;
            this.setState(update);
        }
    }

    tagChanged(e: any) {
        this.setState({tag: e.target.value});
    }

    newLineChanged(e: any) {
        this.setState({newLine: e.target.value})
    }

    addLine() {
        const newLineName = this.state.newLine;
        const lines = [...this.state.lines, {name: newLineName, color: randomColor()}]
        this.setState({newLine: '', lines})
    }

    deleteItem(index: number) {
        const newArr = [...this.state.lines];
        newArr.splice(index, 1);
        this.setState({lines: newArr});
    }

    generate() {
        const request: IGraphRequest = {
            from: this.state.from,
            to: this.state.to,
            lines: this.state.lines
        };
        if (this.state.tag) {
            request.tag = this.state.tag;
        }
        this.props.generateGraph(request);
    }

    render() {      
        return (
            <Grid container spacing={16} direction="column">
                <Grid item>
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
                                                    <DatePicker 
                                                        className="datepicker" 
                                                        textFieldStyle={{width: '100%', height: 32}}
                                                        value={this.state.from}
                                                        onChange={this.dateChanged('from')}/>
                                                </Grid>
                                                <Grid item className="to-label-container">                                    
                                                    <div className="to-label">
                                                        <Translate id="statistics.to">to</Translate>:
                                                    </div>                                    
                                                </Grid>
                                                <Grid item>
                                                    <DatePicker 
                                                        className="datepicker" 
                                                        textFieldStyle={{width: '100%', height: 32}}
                                                        value={this.state.to}
                                                        onChange={this.dateChanged('to')}/>
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
                                                    <Select className="tag-select" 
                                                            value={this.state.tag}
                                                            onChange={this.tagChanged.bind(this)}>
                                                        {this.props.tags.map((x, i) => 
                                                            <MenuItem key={i} value={x}>{x}</MenuItem>
                                                        )}
                                                        <MenuItem value=""></MenuItem>
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
                                            <Select className="tag-select"
                                                    value={this.state.newLine}
                                                    onChange={this.newLineChanged.bind(this)}>
                                                {this.props.references.map((x, i) => 
                                                    <MenuItem key={i} value={x}>{x}</MenuItem>
                                                )}
                                            </Select>
                                        </Grid>
                                        <Grid item className="add-icon">
                                            <Add onClick={this.addLine.bind(this)}/>
                                        </Grid>
                                    </Grid>
                                    <List>                                
                                        {this.state.lines.map(this.Line)}
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Translate>
                            {({translate}) => <RaisedButton primary onClick={this.generate.bind(this)} label={translate('statistics.generate')}/>}  
                            </Translate>
                        </CardActions>
                    </Card>
                </Grid>

                {
                    this.props.graph.state === ILoadingState.LOADING && (
                        <Grid item>
                            <Grid container justify="center">
                                <Grid item>
                                    <CircularProgress style={{margin: '0 auto'}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    this.props.graph.state === ILoadingState.LOAD_SUCCESS && this.props.graph.value !== null && (
                        <Grid item>
                            <Card>
                                <DateGraph data={this.props.graph.value}/>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)