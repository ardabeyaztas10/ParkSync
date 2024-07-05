const express = require('express');
const dotenv = require('dotenv');
const connect = require('./Utils/connection'); 
const Router = require('./Routers/users');
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config();
connect();

app.use(express.json());
app.use('/', Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} started on port.`);
});