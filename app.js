const express = require('express');
const db = require('./models');


const  app = express();
const port = process.env.PORT || 5001;

db.User.create({
    name: 'test'
}).then(() => {
    return db.User.findAll()

}).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})


app.get('/', function test(req, res) {
    res.send('test gogogogo')
})


app.listen(port, () => {
    
    console.log(`Example app listening at http://localhost:${port}`);
})



