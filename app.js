// set up ======================================================================

// Modules NodeJs
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://zayro:zayro2019@ds243054.mlab.com:43054/sib219';

mongoose.connect(mongoDB, { useMongoClient: true, useNewUrlParser: true }).then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });


const app = express();


app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request



// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(bodyParser.json());

// Route Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
    return true;
});



// =================================================================
// routes ==========================================================
// =================================================================

// Routes which should handle requests
// routes ==========================================================
// require('./src/routes/index')(app);
// Module Route
const Route = require('./src/routes/index');
app.use('/user', Route.UserRoutes);
app.use('/rol', Route.RolRoutes);
app.use('/permission', Route.PermissionRoutes);
app.use('/auth', Route.AuthRoutes);
app.use('/userRol', Route.UserRolRoutes);

app.get('/', (req, res) => {

    return res.status(200).send({
        message: "Welcome to Api SIB Colombia "
    });

});


// Route Not Found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Route Handle Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    next(error);
});




app.listen(3000, () => console.log('Example app listening on port 3000!'))

//module.exports = app;