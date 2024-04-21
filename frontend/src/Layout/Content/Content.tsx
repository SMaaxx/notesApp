import React, { useState } from 'react';
import styles from './Content.module.css';
import { Day, Note } from '../../types';
import VerticalDots from '../../common/icons/VerticalDots/VerticalDots';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { formatDate } from '../../common/utils/utils';
import NoteMenu from './NoteMenu/NoteMenu';

interface Props {
  setActiveNoteParams: React.Dispatch<React.SetStateAction<{
    id: string,
    day: string,
    date: Date
    type: string
  }>>,
  setIsPopupShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Content: React.FC<Props> = ({ setActiveNoteParams, setIsPopupShow }) => {
  const data = useSelector((state: RootState) => state.dataReducer.data);
  const [openNoteMenuId, setOpenNoteMenuId] = useState<string>('');

  const onNoteClickHandler = (id: string, day: string): void => {
    setActiveNoteParams({
      id: id,
      day: day,
      type: 'edit',
      date: new Date()
    })
    setIsPopupShow(true);
  }

  return(
    <div className={styles.container}>
      {Object.entries(data).map(([key, item]: [string, Day]) => {
        return(
          <div className={styles.column} key={key}>
            <div className={styles.title}>
              <div className={item.day.holiday ? `${styles.number} ${styles.holiday}` : styles.number}>{item.day.date}</div>
              <div className={styles.day}>{item.day.name}</div>
              <div className={styles.month}>{item.day.month}</div>
            </div>
            <div className={styles.notes}>
              {item.notes.map((note: Note) => {
                return(
                  <div className={styles.note}>
                    {openNoteMenuId === note.id && <NoteMenu setOpenNoteMenuId={setOpenNoteMenuId} id={note.id} day={key} data={data}/>}
                    <div
                      className={styles.label}
                      onClick={() => onNoteClickHandler(note.id, key)}
                    >{note.title}</div>
                    <div className={styles.content}>{note.content}</div>
                    <div className={styles.date}>{note.date && formatDate(note.date)}</div>
                    <div
                      className={styles.dots}
                      onClick={() => setOpenNoteMenuId(note.id)}
                    >
                      <VerticalDots/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Content;