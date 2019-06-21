const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const home = require('./routes/home');
const logging = require('./middleware/logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logging);
app.use(morgan('default'));

app.use('/users', users);
app.use('/', home);

app.listen(3000, () => console.log('Server Starting'));
