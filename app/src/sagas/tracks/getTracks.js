import http from '../../http';
import { call, put, takeLatest } from 'redux-saga/effects';
import actionCreators from '../../actions/tracks/getTracks';

import * as actionTypes from '../../constants/actionTypes';

function* getTracks () {
    let response;
    try {
        response = yield call(http.get, 'tracks');
        yield put(actionCreators.getTracksSuccess(response.data));
    
    } catch (error) {
        yield put(actionCreators.getTracksError(error));
    }
}

export function* fetchTracks () {
    yield takeLatest(actionTypes.GET_TRACKS, getTracks);
}