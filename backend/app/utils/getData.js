const getData = (notes, week) => {

  const getRussianMounth = (date) => {
    const options = { month: 'long', locale: 'ru-RU' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  };

  const editedData = {
    'Monday': {
      notes: [],
      day: {
        date: week.mon.getDate(),
        month: getRussianMounth(week.mon),
        name: 'Понедельник',
        holiday: false
      }
    },
    'Tuesday': {
      notes: [],
      day: {
        date: week.tue.getDate(),
        month: getRussianMounth(week.tue),
        name: 'Вторник',
        holiday: false
      }
    },
    'Wednesday': {
      notes: [],
      day: {
        date: week.wed.getDate(),
        month: getRussianMounth(week.wed),
        name: 'Среда',
        holiday: false
      }
    },
    'Thursday': {
      notes: [],
      day: {
        date: week.thu.getDate(),
        month: getRussianMounth(week.thu),
        name: 'Четверг',
        holiday: false
      }
    },
    'Friday': {
      notes: [],
      day: {
        date: week.fri.getDate(),
        month: getRussianMounth(week.fri),
        name: 'Пятница',
        holiday: false
      }
    },
    'Saturday': {
      notes: [],
      day: {
        date: week.sat.getDate(),
        month: getRussianMounth(week.sat),
        name: 'Суббота',
        holiday: true
      }
    },
    'Sunday': {
      notes: [],
      day: {
        date: week.sun.getDate(),
        month: getRussianMounth(week.sun),
        name: 'Воскресенье',
        holiday: true
      }
    },
  };

  notes.forEach((item) => {
    editedData?.[item.dataValues.date.toLocaleDateString('en-US', { weekday: 'long' })].notes.push(item);
  });

  return editedData;
};

module.exports = getData;