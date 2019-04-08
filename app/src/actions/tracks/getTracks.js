import * as type from '../../constants/actionTypes';

const actionCreators = {
    getTracksRequest: () => ({
        type: type.GET_TRACKS,
        payload: {}
    }),
    getTracksSuccess: (data) => {
        return {
            type: type.GET_TRACKS_SUCCESS,
            payload: data
        };
    },
    getTracksError: (error) => ({
        type: type.GET_TRACKS_ERROR,
        payload: error
    }),
};

export default actionCreators;
