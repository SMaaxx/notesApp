import React from 'react';
import styles from  './NoteMenu.module.css';
import { deleteNote } from '../../../service/api';
import { Data } from '../../../types';

interface Props {
  setOpenNoteMenuId:  React.Dispatch<React.SetStateAction<string>>
  id: string,
  day: string,
  data: Data
}

const NoteMenu: React.FC<Props> = ({ setOpenNoteMenuId, id, day, data }) => {
  const onDeleteClickHandler = () => {
    deleteNote(data, id, day);
    setOpenNoteMenuId('');
  }

  return(
    <div className={styles.container}>
      <div
        className={styles.item}
        onClick={onDeleteClickHandler}
      >
        Удалить
      </div>
    </div>
  );
}

export default NoteMenu;