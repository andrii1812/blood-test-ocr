import { connect } from "react-redux";
import React = require("react");
import { loadList, deleteTest } from "./actions";
import { ITestListEntry } from "../../model/testList";
import { namespacedAction } from "redux-subspace";
import { Grid, CircularProgress, Paper, TableHead, TableBody, Table, TableRow, TableCell } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { IAppState } from "../../model";
import { push } from "connected-react-router";
import './testList.scss'
import { Translate } from "react-localize-redux";

interface ITestListProps {
    list: ITestListEntry[],
    loading: boolean,
    loadList: () => void,
    loadSingleTest: (id: string) => void,
    deleteTest: (e: ITestListEntry) => void
}

const mapDispatchToProps = (dispatch: any) => ({
    loadList: () => dispatch(namespacedAction('testList')(loadList())),
    loadSingleTest: (id: string) => dispatch(push('/test/' + id)),
    deleteTest: (e: ITestListEntry) => dispatch(namespacedAction('testList')(deleteTest(e)))
})

const mapStateToProps = (state: IAppState) => ({
    list: state.testList.list,
    loading: state.testList.loading
})

class TestList extends React.Component<ITestListProps> {
    deleteTest(test: ITestListEntry): any {
        this.props.deleteTest(test);
    }
    
    editTest(e: ITestListEntry): any {
        this.props.loadSingleTest(e.id);
    }

    componentDidMount(){
        this.props.loadList();
    }

    TestListEntry = (el: ITestListEntry) => (
        <TableRow key={el.id} hover>
            <TableCell>
                {el.date}
            </TableCell>
            <TableCell>
                {el.numValues}
            </TableCell>
            <TableCell>
                {el.tag === null ? 'None' : el.tag}
            </TableCell>
            <TableCell>
                    <Edit onClick={() => this.editTest(el)} className="action"/>
                    <Delete onClick={() => this.deleteTest(el)} className="action"/>                    
            </TableCell>
        </TableRow>
    )

    render() {
        if (this.props.loading || !this.props.list) {
            return (
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress style={{margin: '0 auto'}}/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Translate id="date">Date</Translate></TableCell>
                            <TableCell><Translate id="testList.testEntries">Test Entries</Translate></TableCell>
                            <TableCell><Translate id="testList.tag">Tag</Translate></TableCell>
                            <TableCell><Translate id="testList.actions">Actions</Translate></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.list.map(this.TestListEntry)}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestList)