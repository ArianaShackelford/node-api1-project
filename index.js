// implement your API here
const express = require('express');

const server = express();

server.use(express.json());


//GET to "/"
server.get('/', (req,res) => {
    res.send({hello: 'Your server is working!'})
})

const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port}\n`));