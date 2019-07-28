const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Wojtek:UfwE0T6hKcZRkRNT@cluster0-oym6e.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true } );
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', () => {
    console.log('MongoDB database connected!')
});

const usersRouter = require('./users');
const gamesRouter = require('./games');
const resultsRouter = require('./results');
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/results', resultsRouter);

const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });