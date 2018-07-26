import { connect } from "react-redux";
import React = require("react");
import { loadList, deleteTest } from "./actions";
import { ITestListEntry, ITestList } from "../../model/testList";
import { namespacedAction } from "redux-subspace";
import { Grid, CircularProgress, Paper, TableHead, TableBody, Table, TableRow, TableCell } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { IAppState } from "../../model";
import { push } from "connected-react-router";
import './testList.scss'

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
        <TableRow key={el.id} className="test-list-entry" hover>
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
                <div className='delete-button'>
                    <Edit onClick={() => this.editTest(el)}/>
                    <Delete onClick={() => this.deleteTest(el)}/>                    
                </div>
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
                            <TableCell>Date</TableCell>
                            <TableCell>Test Entries</TableCell>
                            <TableCell>Tag</TableCell>
                            <TableCell>Actions</TableCell>
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