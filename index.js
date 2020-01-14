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
        res.status(500).json({errorMessage: "sorry, we ran into an error getting the list of users"});
    });
});

//Get user by id
server.get('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    Users.findById(id)
    .then(user => {
        console.log('this is a user',user);
            if( !user){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }else
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "sorry, we ran into and finding that user"})
    })
})

//Create a new user
server.post('/api/users', (req, res) => {
    const userData = req.body; //need validation here I believe but I'm not sure how...
     if(!req.body.name || !req.body.bio){
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    }else
    Users.insert(userData)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "The user with the specified ID does not exist"});
    });
});

//Delete a user
server.delete('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    // console.log(req);
    Users.remove(id)
    .then(deleted=> {
        if( !deleted){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }else
        res.status(200).json(deleted);
    })//returns the number of records deleted
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "sorry, we ran into and error deleting that user"})
    })
})

//Edit user info 
server.put('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    Users.update(id, req.body)
    .then(user => {
        if( !user){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }else if (!req.body.name || !req.body.bio){
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user"
            })
        }else
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "sorry, we ran into and changing that users info"})
    })
})

const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port}\n`));