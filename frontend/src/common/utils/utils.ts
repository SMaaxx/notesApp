import { Data, Note } from '../../types';


export const getNote = (id: string, day: string, data : Data ): Note | undefined => {
  return data[day]?.notes?.find((item: Note) => item.id === id);
}

export const getDateUTC = (date: Date): Date => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export const formatDate = (date: Date): string => {
  const techDate = new Date(date)

  const day = String(techDate.getDate()).padStart(2, '0');
  const month = String(techDate.getMonth() + 1).padStart(2, '0');
  const year = String(techDate.getFullYear());

  return `${day}-${month}-${year}`;
}

export const replaceNote = (data: Data, note: Note, day: string): Data => {
  const editedData = { ...data };

  editedData[day].notes[editedData[day].notes.findIndex((item: Note) => {
    return item.id === note.id
  })] = note

  return editedData;
}

export const deleteFromData = (data: Data, id: string, key: string): Note[] => {
  return data[key].notes.reduce((acc: Note[], item: Note) => {
    item.id !== id && acc.push(item);

    return acc
  }, [])
}