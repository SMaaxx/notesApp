const db = require('../models');
const getData = require('../utils/getData');

const Note = db.notes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.note.title) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }
  const date = new Date(req.body.date);

  const startDate = new Date(date);

  startDate.setDate(date.getDate() - date.getDay() + 1);

  const week = {
    mon: new Date(startDate), // Создаем новый объект Date для понедельника
    tue: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для вторника
    wed: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для среды
    thu: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для четверга
    fri: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для пятницы
    sat: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для субботы
    sun: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для воскресенья
  };

  const note = {
    title: req.body.note.title,
    content: req.body.note.content,
    date: req.body.note.date
  };


  Note.create(note)
    .then(() => {
      Note.findAll( {
        where: {
          date: {
            [Op.between]: [week.mon, week.sun]
          }
        }
      })
        .then(data => {
          const response = getData(data, week);
          res.send(response);
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Note.'
      });
    });
};

exports.findAll = (req, res) => {
  const date = new Date(req.body.date);

  const startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay() + 1);

  const week = {
    mon: new Date(startDate), // Создаем новый объект Date для понедельника
    tue: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для вторника
    wed: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для среды
    thu: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для четверга
    fri: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для пятницы
    sat: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для субботы
    sun: new Date(startDate.setDate(startDate.getDate() + 1)), // Создаем новый объект Date для воскресенья
  };

  Note.findAll( {
    where: {
      date: {
        [Op.between]: [week.mon, week.sun]
      }
    }
  })
    .then(data => {
      const response = getData(data, week);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving notes.'
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.note.id;

  Note.update(req.body.note, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        Note.findByPk(id)
          .then(updatedNote => {
            res.send(updatedNote);
          });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating note with id=' + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.body.id;

  Note.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({success: true});
      } else {
        res.send({
          message: `Cannot delete note with id=${id}. Maybe note was not found!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete note with id=' + id
      });
    });
};