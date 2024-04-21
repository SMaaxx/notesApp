module.exports = (sequelize, Sequelize) => {
  const notes = sequelize.define('notes', {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATE
    }
  });

  return notes;
};