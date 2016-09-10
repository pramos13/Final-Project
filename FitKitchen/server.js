

// DEPENDENCIES
// Node Package Modules


// import Node File System module express 
var express = require('express');
// import Node File System module body-parser 
var bodyParser = require('body-parser');

// import Node File System module path 
var path = require('path');

// import Node File System module method-override 
var methodOverride = require('method-override');
var models = require('./models');


// PREPARE TABLES in MySQL)
/// extract our sequelize connection 
var seqConnection = models.sequelize;


//run this query so that we can drop our tables 
seqConnection.query('SET FOREIGN_KEY_CHECKS = 0')

.then(function(){
	return seqConnection.sync()
})





// create an instance of express 

var app = express();

app.use(express.static(process.cwd() + '/public'));


// BodyParser makes it easy for our server to interpret data sent to it.

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.text());  
app.use(bodyParser.json({type:'application/vnd.api+json'})); 

app.use(methodOverride('_method'));

// create an instance of express handlebars
// this allows access to the full API
var exphbs = require('express-handlebars');

// tell express to use handlebars as a template engine
// A template engine enables you to use static template files
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
// register the template engine
app.set('view engine', 'handlebars');

// local dependency - routes = express.router for all routes
var api_routes = require('./routes/api_routes.js');


app.use('/', api_routes);

var PORT = process.env.PORT || 3000;
app.listen(PORT);
