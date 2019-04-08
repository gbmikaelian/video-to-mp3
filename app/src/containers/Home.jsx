import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import getTracksActionCreators from '../actions/tracks/getTracks';
import addTrackActionCreators from '../actions/tracks/AddTrack';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    inline: {
        display: 'inline-block'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    control: {
        padding: theme.spacing.unit * 2
    },
    icon: {
        cursor: 'pointer',
        margin: theme.spacing.unit * 2,
    },
    tablesBlock: {
        display: 'flex',
        border: '1px solid'
    }
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

class Home extends Component {
    state = {
        url: ''
    };

    componentDidMount() {
        this.props.getTracks();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.addTrackReducer.success !== this.props.addTrackReducer.success) {
            this.props.getTracks();
        }
    }

    onAddTrack = () => {
        
        this.props.addTrack(this.state.url);
        this.setState({
            url: ''
        });
        
    }

    setInputValue = name => e => {
        this.setState({[name]: e.target.value});
    }

    render() {
        const {tracks, addTrackReducer, apiBaseUrl, classes} = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid
                        container
                        className={classes.demo}
                        justify="center">
                        <div className={classes.tablesBlock}>
                            <Grid key="pros" item style={{borderRight: '1px solid'}}>
                                <Paper className={classes.root}>
                                    <Table className={classes.table} >
                                        <TableHead>
                                            <TableRow>
                                                <CustomTableCell>
                                                    track Name
                                                </CustomTableCell>
                                                <CustomTableCell>
                                                    Action
                                                </CustomTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                tracks.map(row => (
                                                    <TableRow className={classes.row} key={row._id}>
                                                        <CustomTableCell component="th" scope="row">
                                                            <div className={classes.frameBlock}>
                                                                <span> 
                                                                    {row.trackName}
                                                                </span>
                                                            </div>
                                                        </CustomTableCell>
                                                        <CustomTableCell>
                                                            <Button color="primary">
                                                                <a className={classes.inline} href={`${apiBaseUrl}/tracks/${row.trackName}`}>Download</a>
                                                            </Button>
                                                        </CustomTableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            <TableRow className={classes.row} key="create">
                                                <CustomTableCell component="th" scope="row">
                                                    <TextField
                                                        disabled={addTrackReducer.loading}
                                                        id="link"
                                                        label="Link"
                                                        type="text"
                                                        margin="dense"
                                                        className={classes.textField}
                                                        value={this.state.url}
                                                        onChange={this.setInputValue('url')}
                                                        variant="outlined"/>
                                                </CustomTableCell>
                                                <CustomTableCell>
                                                    {
                                                        addTrackReducer.loading ?
                                                            <CircularProgress className={classes.progress} color="secondary" />
                                                            : <Fab color="primary" size="small" aria-label="Add" onClick={this.onAddTrack} className={classes.fab} >
                                                                <AddIcon />
                                                            </Fab>
                                                    }
                                                </CustomTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        addTrackReducer: state.addTrack,
        tracks: state.getTracks.tracks,
        apiBaseUrl: state.global.apiBaseUrl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTracks() {
            dispatch(getTracksActionCreators.getTracksRequest());
        },
        addTrack (url) {
            dispatch(addTrackActionCreators.addTrackRequest(url));
        }
    };
};

Home.propTypes = {
    getTracks: PropTypes.func,
    addTrackReducer: PropTypes.object,
    apiBaseUrl: PropTypes.string,
    addTrack: PropTypes.func,
    tracks: PropTypes.array,
    classes: PropTypes.object,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));