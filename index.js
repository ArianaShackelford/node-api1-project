// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());


//GET to "/"
server.get('/', (req,res) => {
    res.send({hello: 'Your server is working!'})
})

//View the list of users
server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "sorry, we ran into an error getting the list of users"})
    })
})

const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port}\n`));