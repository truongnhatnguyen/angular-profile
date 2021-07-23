const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

const projectRouters = require('./routes/project')
const employeeRoutes = require('./routes/employee');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')
const app = new express();


mongoose.connect(config.DATABASE_CONNECT_URL, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to the database');

    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.use(authJwt());
app.use(errorHandler);

app.use(`${config.API}/accounts`, employeeRoutes);
app.use(`${config.API}/project`, projectRouters)

app.listen(config.PORT, err => {
    console.log('magic happens on port awesome ' + config.PORT)
})