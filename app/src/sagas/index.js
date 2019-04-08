import {all} from 'redux-saga/effects';
import { fetchTracks } from './tracks/getTracks';
import { fetchAddTrack } from './tracks/addTrack';

export default function* () {
    yield all([
        fetchTracks(),
        fetchAddTrack()
    ]);
}