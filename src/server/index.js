const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const createExpressApp = require('./create-express-app');

require('dotenv').config();

const client = new MongoClient(process.env.DB_CONN, { useNewUrlParser: true });

client.connect((err) => {
    if (err) {
        console.log("Error connecting to mongodb: " + err);
    } else {
        console.log("Connected successfully to mongodb");

        createExpressApp(client.db(process.env.DB_NAME)).listen(3000, () => {
            console.log('Listening on port 3000.');
        });
    }
});