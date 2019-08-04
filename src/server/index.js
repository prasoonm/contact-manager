const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));

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

app.post('/api/contacts', (request, response) => {
    const contact = request.body;
    const contactsCollection = database.collection('contacts');

    contactsCollection.insertOne(contact, (err, r) => {
        if (err) {
            return response.status(500).json({ error: 'Error inserting new contact.' });
        }

        const newRecord = r.ops[0];
        return response.status(201).json(newRecord);
    });
});

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'))
});