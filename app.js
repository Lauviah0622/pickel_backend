
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
// eslint-disable-next-line


require('dotenv').config()


const  app = express();
app.use(cors())

const env =  process.env.NODE_ENV;
console.log('enviroment: ', env);
const portEnvVar = {
    production: process.env.PORT_PROD,
    test: process.env.PORT_TEST
}
const port = portEnvVar[env] || 5001;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 

// use all routers
require('./routers')(app);

app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Example app listening at http://localhost:${port}`);
})


