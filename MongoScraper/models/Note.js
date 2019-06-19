var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//define the model for note
var NoteSchema = new Schema({
    //Title, Body and dateStamp
    title: String,
    body: String,
    date: {
        type: Date,
        default: Date.now()
    }
    //
});

//create the model using the schema
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;