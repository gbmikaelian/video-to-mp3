import * as type from '../../constants/actionTypes';

const actionCreators = {
    addTrackRequest: (data) => ({
        type: type.ADD_TRACK,
        payload: data
    }),
    addTrackSuccess: (data) => ({
        type: type.ADD_TRACK_SUCCESS,
        payload: data
    }),
    addTrackError: (error) => ({
        type: type.ADD_TRACK_ERROR,
        payload: error
    }),
};

export default actionCreators;
