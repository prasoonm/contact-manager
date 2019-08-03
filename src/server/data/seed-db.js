require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords) {
    const client = new MongoClient(process.env.DB_CONN, { useNewUrlParser: true });

    client.connect((err) => {
        if (err) {
            console.log("Error connecting to server: " + err);
        } else {
            console.log("Connected successfully to server");

            const db = client.db(process.env.DB_NAME);
            const collection = db.collection(collectionName);

            collection.remove();

            initialRecords.forEach(item => {
                if (item.password) {
                    item.password = bcrypt.hashSync(item.password, 10);
                }
            });

            collection.insertMany(initialRecords, (err, result) => {
                if (err) {
                    console.log("Error inserting to db. Error: " + err);
                } else {
                    console.log(`${result.insertedCount} records inserted.`);
                    console.log('Closing connection.');
                    client.close();
                    console.log('Done.');
                }
            });
        }
        client.close();
    });
}

seedCollection('users', users);
seedCollection('contacts', contacts);