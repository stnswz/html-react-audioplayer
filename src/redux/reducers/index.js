import { combineReducers } from 'redux';
import playReducer from './playReducer';

const rootReducer = combineReducers({
    playState: playReducer,
});

export default rootReducer;