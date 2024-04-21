const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

var corsOptions = {
  origin: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
const db = require('./models');
db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.get('/', (req, res) => {
  res.json({ message: 'pobeda.' });
});

require('./routes/notes.routes')(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});