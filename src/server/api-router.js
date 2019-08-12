const express = require('express');

function apiRouter(database) {
    const router = express.Router();

    router.get('/contacts', (request, response) => {
        const contactsCollection = database.collection('contacts');
        contactsCollection.find({}).toArray((err, docs) => {
            return response.json(docs);
        });
    });
    
    router.post('/contacts', (request, response) => {
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

    return router;
}

module.exports = apiRouter;