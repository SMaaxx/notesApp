import { Data, DataState } from '../../types';

interface Action {
  type: string,
  payload: Data
}

const initialState: DataState = {
  data: {
    'mon': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: false
      }
    },

    'tue': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: false
      }
    },

    'wed': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: false
      }
    },

    'thu': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: false
      }
    },

    'fri': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: false
      }
    },

    'sat': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: true
      }
    },
    'sun': {
      notes: [],
      day: {
        date: 0,
        month: '',
        name: '',
        holiday: true
      }
    }
  }
}

const counterReducer = (state: DataState = initialState, action: Action): DataState => {
  const updatedState: DataState = { ...state };

  if (action.type === 'changeAll') {
    (updatedState.data = action.payload);
  }

  return updatedState;
};

export default counterReducer;