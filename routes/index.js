var express = require('express');
var router = express.Router();

//load the models 
var db = require("../models");

// //initializing the express
// var app = express();

// // // /* GET home page. */
// app.get("/", function(req, res){
//   //Welcome to News Clipper!
//   res.json("Welcome to News Clipper!");
//   db.Article.find()
//       .then(function(data){
//           //res.render("articles", { articles: data});
//           //res.json(data);
//       });
// })

module.exports = router;
