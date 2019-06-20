var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//Axios will be used for scraping and cheerios to help it store and render
var axios = require("axios");
var cheerio = require("cheerio");

//load the models 
var db = require("./models");


var PORT = 7007;

//initializing the express
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

// Use logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var databaseUri = "mongodb://localhost/newsClipper";

if (process.env.MONGODB_URI)
  {
    mongoose.connect(process.env.MONGODB_URI);
  }
 else //for local
  {
    mongoose.connect(databaseUri , { useNewUrlParser: true });
  }

// //default route
app.get("/", function(req, res){
    //Welcome to News Clipper!
    //res.json("Welcome to News Clipper!");
    db.Article.find()
        .then(function(data){
            res.render("articles", { articles: data});
            //res.json(data);
        });
})

app.get("/articles/:id", function(req, res) {
    // Welcome to News Clipper!
    // res.json("Welcome to News Clipper!");
    db.Article.findOne({
        _id: req.params.id
      }).populate("note")
        .then(function(data){
            res.render("articles", { articlesNotes: data});
            //res.json(data);
      })
  });

// Route for saving/updating an Article's associated Note
app.post("/api/articles/:id", function(req, res) {
    console.log(req.body);
    var note = {};
    note.title = req.body.noteTitle;
    note.body = req.body.note;
// save the new note to the Notes collection
    console.log(note);
    // db.Note.create(note)
    //     .then(function(dbNote){
    //         return db.Article.findOneAndUpdate(
    //         {_id: req.params.id}, 
    //         {$push: {notes:dbNote._id}},
    //         {new: true})
    //     }).then(function(article){
    //         res.json(article);
    //         //console.log("it is saved!");
    //     })
  });

// Route for deleting an Article
app.delete("/api/articles/:id", function(req, res) {
    // save the new note to the Notes collection
    db.Article.deleteOne({
        _id: req.params.id
        }).then(function(data)
        {
            console.log("Deleted");
            res.json(data);
        });
});

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios  https://www.reddit.com/r/TheOnion/
    axios.get("https://TheOnion.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article").each(function(i, element) {
        // Save an empty result object
        var articleArr = {};
    
        // Add the text and href 
        // save the articleArr into Article model
        var title = $(element).children().text();
        var link = $(element).find("a").attr("href");
        var note = {};

        articleArr.title = title;

        //set the link property
        articleArr.link = link;
        //add the note
        articleArr.note = note;

        // Create a new Article using the `articleArr` object built from scraping
        db.Article.create(articleArr)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log("error occured" + err);
          });

          console.log(articleArr);
      });

    // Send a message to the client
     //res.send("Scrape Complete");
     res.json(result);
  });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  