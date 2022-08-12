const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const mongoose = require('mongoose');

//environment variables
let uri = '';
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') uri = process.env.DB_URL;
else if (NODE_ENV === 'test') uri = 'mongodb://localhost:27017/advBookTest';
else uri = 'mongodb://localhost:27017/advBook';

//import routes
const advertsRoutes = require('./routes/adverts.routes');
const usersRoutes = require('./routes/users.routes');
const authsRoutes = require('./routes/auths.routes');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

//routes
app.use('/api/', advertsRoutes);
app.use('/api/auth/', authsRoutes);

//production mode
if(NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

app.use((req, res) => {
  res.status(404).send('404 page not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

//connect to database
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  if (NODE_ENV !== 'test') {
    console.log('Connected to the database');
  }
});
db.on('error', (err) => console.log('Error ' + err));

module.exports = server;
