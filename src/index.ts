const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongooseUri = 'mongodb+srv://root:secretsauce@cluster0.akkpu8l.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

