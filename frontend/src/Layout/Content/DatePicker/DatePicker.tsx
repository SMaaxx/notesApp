import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const css = `
   .rdp {
    --rdp-background-color: red;
  }
`;

interface Props {
  defaultValue?: Date
  onChange: Function
}

const DatePicker: React.FC<Props> = ({ defaultValue, onChange }) => {
  const [selectedDay, setSelectedDay] = useState<Date>(defaultValue || new Date());

  const onDayClickHandler = (date: Date | undefined) => {
    date && setSelectedDay(date);
    onChange(date)
  }

  return(
    <>
      <style>{css}</style>
      <DayPicker
        mode="single"
        defaultMonth={selectedDay}
        locale={ru}
        selected={selectedDay}
        onSelect={(date: Date | undefined) => onDayClickHandler(date)}
      />
    </>
  );
};

export default DatePicker;