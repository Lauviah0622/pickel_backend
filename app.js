const express = require('express');
// const db = require('./models');
require('dotenv').config()


const  app = express();
const env =  process.env.NODE_ENV;

const portEnvVar = {
    production: process.env.PORT_PROD,
    test: process.env.PORT_TEST
}
const port = portEnvVar[env] || 5001;

// DB test
// db.User.findAll()
// .then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })


app.get('/', function test(req, res) {
    res.send('test gogogogo')
})


app.listen(port, () => {
    
    // console.log(`Example app listening at http://localhost:${port}`);
})


