import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    error: false,
    success: false,
    loading: false
};
export const addTrack = (state = initialState, { type, payload }) => {
    switch (type) {
    case actionTypes.ADD_TRACK: {
        return {
            ...state,
            success: false,
            error: false,
            loading: true
        };
    }
        
    case actionTypes.ADD_TRACK_SUCCESS: {
        return {
            ...state,
            success: true,
            loading: false
        };
    }
        
    case actionTypes.ADD_TRACK_ERROR: {
        return {
            ...state,
            error: true,
            success: false,
            errorMessage: payload.message,
        };
    }

    default:
        return state;
    }
};