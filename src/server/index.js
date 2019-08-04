const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

let database;

const client = new MongoClient(process.env.DB_CONN, { useNewUrlParser: true });

client.connect((err) => {
    if (err) {
        console.log("Error connecting to mongodb: " + err);
    } else {
        console.log("Connected successfully to mongodb");

        app.listen(3000, () => {
            database = client.db(process.env.DB_NAME);
            console.log('Listening on port 3000.');
        });
    }
});

app.get('/api/contacts', (request, response) => {
    const contactsCollection = database.collection('contacts');
    contactsCollection.find({}).toArray((err, docs) => {
        return response.json(docs);
    });
});