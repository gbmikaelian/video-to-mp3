import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    error: false,
    success: null,
    errorMessage: '',
    tracks: []
};

export const getTracks = (state = initialState, { type, payload }) => {
    switch (type) {
    case actionTypes.GET_TRACKS: {
            
        return {
            success: false,
            ...state
        };
    }

    case actionTypes.GET_TRACKS_SUCCESS: {
        return {
            ...state,
            success: true,
            tracks: payload.response
        };
    }
        
    case actionTypes.GET_TRACKS_ERROR: {
        const error = {...payload};
        let response = {
            ...state,
            error: true,
            success: false,
            errorMessage: payload.message,
        };

        if (error.response && error.response.status === 404) {
            return {
                ...response,
                error: false,
            };    
        }
        return response;
    }

    default:
        return state;
    }
};