import { combineReducers } from 'redux';
import { getTracks } from './tracks/getTracks';
import { addTrack } from './tracks/addTrack';

const rootReducer = combineReducers({
    global: () => ({apiBaseUrl: 'http://localhost:4000'}),
    getTracks,
    addTrack
});
  
export default rootReducer;
  