import axios from 'axios';
import store from '../Store/Store';
import { Data, Note } from '../types';
import { replaceNote, deleteFromData } from '../common/utils/utils';

export const getNotes = async (date: Date): Promise<void> => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/getNotes`, { date: date });

    store.dispatch({
      type: 'changeAll',
      payload: response.data
    })
  } catch (e) {
    console.log('Cannot get', e);
  }
};

export const createNote = async (data: Data, note: Note, date: Date ): Promise<void> => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/createNote`, {
      note: note,
      date: date
    });

    store.dispatch({
      type: 'changeAll',
      payload: response.data
    })
  } catch (e) {
    console.log('Cannot create', e);
  }
};

export const deleteNote = async (data: Data, id: string, key: string): Promise<void> => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/deleteNote`, { id: id });

    response.data.success && store.dispatch({
      type: 'changeAll',
      payload: { ...data, [key]: {...data[key], notes: deleteFromData(data, id, key)}}
    })
  } catch (e) {
    console.log('Cannot delete', e);
  }
};

export const editNote = async (data: Data, note: Note, day: string): Promise<void> => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/changeNote`, {
      note: note
    });

    store.dispatch({
      type: 'changeAll',
      payload: replaceNote(data, response.data, day)
    })
  } catch (e) {
    console.log('Cannot edit', e);
  }
};