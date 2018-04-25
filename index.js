const express = require('express');
const cookieSession = require('cookie-session');
const formidable = require('formidable');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
const databaseConfig = require('./config/database');
const passportConfig = require('./config/passport');
const sessionConfig = require('./config/session');
const adminPolicies = require('./policies/isAdmin');

const app = express();

app.use(helmet());
app.disable('x-powered-by');

// create server and require socket.io
const server = require('http').createServer(app);
global.io = require('socket.io')(server);

// port
app.set('port', process.env.PORT || 5000);

// static
app.use(express.static(__dirname + '/public'));

//  view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }

    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// cookie-sessin
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [sessionConfig.cookieKey]
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// database connect
mongoose.connect(databaseConfig.dbUrl)
.then(() => console.log('Database connection success'))
.catch(err => console.log(`Database connection error: ${err}`));

// global variables and functions
app.use((req, res, next) => {
  global.styles = [];
  global.scripts = [];
  global.user = req.user;

  next();
});

// routes
const { admin, api, site } = require('./routes');

app.use('/admin', adminPolicies, admin);
app.use('/api', api);
app.use('/', site);

// Handle 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Handle 500
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send('Internal Server Error');
});

server.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});
