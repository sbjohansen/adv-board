const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const app = express();
require('dotenv').config();

//connect to db
let uri = '';
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') uri = process.env.DB_URL;
else if (NODE_ENV === 'test') uri = 'mongodb://localhost:27017/advBookTest';
else uri = 'mongodb://localhost:27017/advBook';

//connect to db

const store = MongoStore.create({
  mongoUrl: uri,
  collection: 'sessions',
});
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8000"],
  credentials: true 
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(mongoose.connection),
    cookie: {
      secure: process.env.NODE_ENV == "production",
    }
  })
);

//import routes
const advertsRoutes = require('./routes/adverts.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// Static files
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}
app.use(express.static(path.join(__dirname, '/uploads/')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/api/', advertsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

module.exports = server;
