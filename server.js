const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const app = express();
require('dotenv').config();

//connect to db
const uri = process.env.DB_URL;
const NODE_ENV = process.env.NODE_ENV;
//connect to db

const store = MongoStore.create({
  mongoUrl: uri,
  collection: 'sessions',
});
mongoose.connect(uri, { useNewUrlParser: true });

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(mongoose.connection),
  })
);

//import routes
const advertsRoutes = require('./routes/adverts.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// Static files

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/uploads/')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/client/build/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//routes
app.use('/api/', advertsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server running on port: 8000');
  }
});

module.exports = server;
