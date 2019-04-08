import http from '../../http';
import { call, put, takeLatest } from 'redux-saga/effects';
import actionCreators from '../../actions/tracks/AddTrack';
import * as actionTypes from '../../constants/actionTypes';

function* addTrack ({payload}) {
    
    try {
        const response = yield call(http.post, 'convert-video', {url: payload});

        yield put(actionCreators.addTrackSuccess(response));
    
    } catch (error) {
        yield put(actionCreators.addTrackError(error));
    }
}

export function* fetchAddTrack () {
    yield takeLatest(actionTypes.ADD_TRACK, addTrack);
}