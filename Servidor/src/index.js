const express = require ('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')

const routes = require('./routes/routes');

global.baseDir = path.resolve(__dirname)

const app = express();


app.use(cors());

dotenv.config();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 4000;


app.listen(PORT, function(){
    console.log("server running");
});