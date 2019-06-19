var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create a schema for the article

var ArticleSchema = new Schema({
    //title and link
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//this creates the model from article schema 
var Article = mongoose.model("Article", ArticleSchema);

//export the article model
module.exports = Article;

