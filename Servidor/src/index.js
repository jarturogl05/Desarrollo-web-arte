const express = require ('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose')

const routes = require('./routes/routes');

global.baseDir = path.resolve(__dirname)

const app = express();


app.use(cors());


dotenv.config();

app.use(express.json());
app.use(routes);
const PORT = process.env.PORT || 4000;



mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
      console.log("Connection succesfull");
      app.listen(PORT, function(){
        console.log("Server running on: " + PORT);
    });

  }).catch(Error => {
      console.log("Mongo error", Error);
  });