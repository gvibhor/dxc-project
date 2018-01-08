const express = require('express');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
let app = express();
let path = require('path');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let api = require('./api');
app.use('/api',api);
app.use(express.static('public'));
let viewPath = path.join(__dirname, 'public/views');
app.set('views' ,viewPath);
app.set('view engine', 'ejs');
let models = require('./models');
models.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



app.get('/', function (req, res, next) {
    res.render('index');
});
app.get('/index', function (req, res, next) {
    res.render('index');
});
app.post('/index', function (req, res, next) {
    res.render('insideWrite', {qs: req.body});
});

app.listen(3000,()=>{
    console.log("Listening to the port 3000");
});
