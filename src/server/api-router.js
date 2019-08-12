const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJWT = require('express-jwt');

function apiRouter(database) {
    const router = express.Router();

    router.use(
        checkJWT( {secret: process.env.JWT_SECRET}).unless({ path: '/api/authenticate' })
    );

    router.use((error, request, response, next) => {
        if(error.name === 'UnauthorizedError') {
            response.status(401).send({error: error.message}); 
        }
    })

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

    router.post('/authenticate', (request, response) => {
        const user = request.body;
        const userCollection = database.collection('users');

        userCollection.findOne({ username: user.username}, (err, result) => {
            if(!result) {
                return response.status(404).json({ error: 'User not found'});
            }

            if( !bcrypt.compareSync(user.password, result.password)) {
                return response.status(401).json({ error: 'Incorrect password'});
            }

            const payload = {
                username: result.username,
                admin: result.admin
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

            return response.json({
                message: 'Successfully authenticated',
                token: token
            });
        });
    });

    return router;
}

module.exports = apiRouter;