const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const app = express();

//environment variables
let uri = '';
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') uri = process.env.DB_URL;
else if (NODE_ENV === 'test') uri = 'mongodb://localhost:27017/advBookTest';
else uri = 'mongodb://localhost:27017/advBook';

const store = MongoStore.create({
  mongoUrl: uri,
  collection: 'sessions',
});

store.on('error', (error) => {
  console.log(error);
});

app.use(
  session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

//connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//import routes
const advertsRoutes = require('./routes/adverts.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors('*'));
app.use(express.static(path.join(__dirname, '/client/build')));

//routes
app.use('/api/', advertsRoutes);
app.use('/auth', authRoutes);

//production mode
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

module.exports = server;
