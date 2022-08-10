const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');

let uri = '';
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') uri = process.env.DB_URL;
else if (NODE_ENV === 'test') uri = 'mongodb://localhost:27017/advBookTest';
else uri = 'mongodb://localhost:27017/advBook';

//import routes
const advertsRoutes = require('./routes/adverts.routes');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/', advertsRoutes);

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Client connected with ID: ' + socket.id);
});

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  if (NODE_ENV !== 'test') {
    console.log('Connected to the database');
  }
});
db.on('error', (err) => console.log('Error ' + err));

module.exports = server;
