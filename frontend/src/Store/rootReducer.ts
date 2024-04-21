import { combineReducers } from 'redux';
import DataReducer from './reducers/dataReducer';

const rootReducer = combineReducers({
  dataReducer: DataReducer,
});

export default rootReducer;