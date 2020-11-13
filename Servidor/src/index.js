const express = require ('express');
const app = express();
const dotenv = require('dotenv');
const routes = require('./routes/user-routes');
const cors = require ('cors');

app.use(cors());

dotenv.config();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 4000;

