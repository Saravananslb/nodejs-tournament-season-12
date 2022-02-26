// all server related main configs are imported here.

const express = require('express');
const databaseConfig = require('../database');

const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.urlencoded({extended: true}));

app.use(express.json());

// DB configuartion import below
databaseConfig;

app.get('/home', (req, res) => {
    res.json({"message": "Successfully routed to home"});
});

// database route below
require('../app/routes')(app);

app.listen(PORT, () => {
    console.log(`server is listening to http://localhost:${PORT}`)
});