module.exports = app => {
  const notes = require('../controllers/Notes.controller.js');

  var router = require('express').Router();

  router.post('/getNotes', notes.findAll);

  router.post('/createNote', notes.create);

  router.post('/changeNote', notes.update);

  router.post('/deleteNote', notes.delete);


  app.use('/api', router);
};