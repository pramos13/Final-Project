// Here is where you create all the functions that will do the routing for your api requests, and the logic of each route, including CRUD commands for the MySQL database (using Sequelize).

var path = require('path');
var express = require('express');
var router = express.Router();
var Recipe = require('../models')["Recipe"];
var Ingredient = require('../models')["Ingredient"];
var getRecipes = require('../getRecipes');


//  ROUTE FOR ROOT AND HOME
//******************************************************
router.get('/', function (req, res) {
	res.redirect('/home');
	});

router.get('/home', function (req, res) {
	res.render('home');
	});


//  ROUTES FOR INGREDIENTS
//******************************************************
router.get('/ingredient', function (req, res) {
	console.log("GET REQUEST RECEIVED BY SERVER");
	Ingredient.findAll()
	.then (function(ingredient){
		console.log("INGREDIENT", ingredient);
		var hbsObject = {ingredient};
		res.render('ingredient', hbsObject);
	});
});

router.post('/ingredient/update', function (req, res) {
	console.log("ingredient received", req.body);
	Ingredient.create(
		{name: req.body.name,
		category: req.body.category})
		.then (function(){
			res.redirect('/ingredient');
		});
});
router.get('/ingredient', function (req, res) {

	Ingredient.findAll()
	.then (function(ingredient){
		console.log("INGREDIENT", ingredient);
		var hbsObject = {ingredient};
		res.render('ingredient', hbsObject);
	});
});
// user identifies an ingredient and a change to the inStock status
router.put('/ingredient/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	Ingredient.update({inPantry: req.body.inPantry }, {where: {id: req.params.id}})
	.then (function () {
		res.redirect('/ingredient');
	});
});


//  ROUTES FOR RECIPES
//******************************************************
router.post('/findRecipe/find', function (req, res) {
	console.log(req.body);
	Recipe.findAll({
	where: {vegan : req.body.vegan}})
	.then (function(recipe){
		var hbsObject = {recipe};
		res.render('findRecipe', hbsObject);
	});

});

router.get('/findRecipe', function (req, res) {
	res.render('findRecipe');
});

router.post('/findRecipe', function (req, res) {
	var condition = 'id=' + req.params.id;

	Recipe.findAll({
		where:{
		vegan: req.body.vegetarian,
		glutenFree: req.body.gluten
	  }
	})
	.then (function(recipe){
		var hbsObject = {recipe};
		res.render('findRecipe', hbsObject);
	})
});

// GET REQUEST TO URI - /addRecipe
router.get('/addRecipe', function (req, res) {
	res.render('addRecipe');
});


//  ROUTE FOR ADMINISTRATOR
//******************************************************
router.get('/admin', function (req, res) {
		res.render('admin');
	});

router.post('/admin/add', function (req, res) {
	getRecipes(
		{searchTerm: req.body.searchTerm,
			category: req.body.vegan});
	res.redirect('/home');

});


//  ROUTES FOR CONTACTUS
//******************************************************
router.get('/contactUs', function (req, res) {

	res.render('contactUs');

});

//  ROUTE FOR PREFERENCES
router.get('/preference', function (req, res) {
res.sendFile(path.join(__dirname + '/../public/preferences.html'));
});


//  ROUTE FOR SIGN-IN
//******************************************************
router.get('/login', function (req, res) {
res.sendFile(path.join(__dirname + '/../public/login.html'));
});

module.exports = router;
