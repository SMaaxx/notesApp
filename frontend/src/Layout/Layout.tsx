import  styles from './Layout.module.css';
import React, { useEffect, useState } from 'react';
import CreateIcon from '../common/icons/CreateIcon/CreateIcon';
import Content from './Content/Content';
import DatePicker from './Content/DatePicker/DatePicker';
import { getNotes } from '../service/api';
import TaskEditPanel from './Content/TaskEditPanel/TaskEditPanel';

const Layout: React.FC = () => {

  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [activeNoteParams, setActiveNoteParams] = useState({
    id: '',
    day: '',
    type: '',
    date: new Date()
  });

  useEffect(() => {
    getNotes(new Date());
  }, []);

  const onCreateButtonCLickHandler = () => {
    setActiveNoteParams({...activeNoteParams, type: 'create'});
    setIsPopupShow(true);
  };

  return(
    <div className={styles.container}>
      {isPopupShow && (<TaskEditPanel id={activeNoteParams.id} day={activeNoteParams.day} setIsPopupShow={setIsPopupShow} date={activeNoteParams.date} type={activeNoteParams.type}/>)}
      <div className={styles.sideMenu}>
        <div
          className={styles.create}
          onClick={onCreateButtonCLickHandler}
        >
          <CreateIcon />
          Создать
        </div>
        <DatePicker onChange={getNotes}/>
      </div>
      <Content setActiveNoteParams={setActiveNoteParams} setIsPopupShow={setIsPopupShow}/>
    </div>
  );
}

export default Layout;