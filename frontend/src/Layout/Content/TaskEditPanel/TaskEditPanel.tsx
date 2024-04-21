import styles from './TaskEditPanel.module.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import { getDateUTC, getNote } from '../../../common/utils/utils';
import { Note } from '../../../types';
import CloseIcon from '../../../common/icons/CloseIcon/CloseIcon';
import DatePicker from '../DatePicker/DatePicker';
import { createNote, editNote } from '../../../service/api';

interface Props {
  id?: string,
  day: string,
  date: Date
  setIsPopupShow: React.Dispatch<React.SetStateAction<boolean>>,
  type: string;
}

const TaskEditPanel: React.FC<Props> = ({ id, day, date, setIsPopupShow, type }) => {
  const data = useSelector((state: RootState) => state.dataReducer.data);

  const [currentNote, setCurrentNote] = useState<Note>(((id && day && type === 'edit') && getNote(id, day, data)) || {
    title: '',
    content: '',
    date: new Date(),
    id: ''
  });

  const onSaveButtonClick = () => {
    type === 'create' && createNote(data, { ...currentNote, date: getDateUTC(currentNote.date) }, date).then()
    type === 'edit' && editNote(data, currentNote, day).then()
    setIsPopupShow(false);
  }

  return(
    <>
      <div className={styles.background}/>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.title}>{type === 'edit' ? 'Изменение заметки' : 'Создание заметки'}</div>
            <input
              className={styles.label}
              defaultValue={currentNote.title}
              placeholder={'Заголовок'}
              onBlur={(e) => setCurrentNote({...currentNote, title: e.target.value})}
            />
            <textarea
              className={styles.noteContent}
              defaultValue={currentNote.content}
              placeholder={'Описание'}
              onBlur={(e) => setCurrentNote({...currentNote, content: e.target.value})}
            />
          </div>
          <div className={styles.right}>
            <div>
              <div className={styles.dateLabel}>{type === 'edit' ? 'Изменить дату' : 'Укажите дату'}</div>
              <DatePicker
                onChange={(date: Date) => setCurrentNote({...currentNote, date: date})}
                defaultValue={currentNote.date ? new Date(currentNote.date) : new Date()}
              />
            </div>
            <div
              onClick={onSaveButtonClick}
              className={styles.save}
            >
              Сохранить
            </div>
          </div>
          <div
            className={styles.close}
            onClick={() => setIsPopupShow(false)}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskEditPanel;