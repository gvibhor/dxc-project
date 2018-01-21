const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require("client-sessions");
const morgan  = require('morgan');
const path = require('path');
let app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
let api = require('./api');
app.use('/api',api);
app.use(express.static('public'));
let viewPath = path.join(__dirname, 'public/views');
app.set('views' ,viewPath);
app.set('view engine', 'ejs');
let models = require('./models');
const settings = require("./settings");
const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'files/')
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.origingitbsttausalname))
    }
});

var upload = multer({ storage:storage });


app.use(sessions({
    cookieName: "session",
    secret: settings.SESSION_SECRET_KEY,
    duration: settings.SESSION_DURATION,
    activeDuration: settings.SESSION_EXTENSION_DURATION,
    cookie: {
        httpOnly: true,
        ephemeral: settings.SESSION_EPHEMERAL_COOKIES,
        secure: settings.SESSION_SECURE_COOKIES
    }
}));

models.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



app.get('/', function (req, res, next) {
    // res.sendFile('./views/index.html');
    res.render('index');
});
app.get('/index', function (req, res, next) {
    res.render('index');
});

app.post('/api/files',upload.any(),function (req, res) {
    // console.log(req.body); // form fields
    // console.log(req.files); // form files
    // res.status(204).end()
    res.json({success:'File uploaded', files:req.files});

});


app.get('api/employees/dashboard1',function (req,res,next){
    console.log(res.params.email+" Log in email");
    res.render('insideWrite',{email:res.params.email});
});

app.get('/dashboard1/:email',function (req,res,next){
    console.log(req.params.email+" Log in email");
    res.render('insideWrite',{email:req.params.email});
});

app.get('/dashboard/:email',function (req, res, next) {
    console.log(req.params+" Prams");
    res.render('managerInside',{email:req.params.email});
});

app.listen(3000,()=>{
    console.log("Listening to the port 3000");
});
