// Get references to page elements
var $addNotesBtn = $(".addNotes");
var $delNotesBtn = $(".delNotes");
var $articleId;

//console.log("In JS");
var API = {    
    saveNote: function (artId) {
        console.log("api/articles/" + artId)
        return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/articles/" + artId,
        data: JSON.stringify(note)
      });
    },
  
    addNote: function () {
      return $.ajax({
        url: "api/note/" + artId,
        type: "GET"
      });
    },
  
    deleteNote: function (noteId) {
      return $.ajax({
        url: "api/note/" + noteId,
        type: "DELETE"
      });
    }
  };

var addNotesClick = function(event){
    event.preventDefault();
    articleId = $(this).parent().attr('data-id');
    console.log("Reached at save notes for: ", articleId );
}


// Remove the Notes 
var delNotesClick = function (event) {
    //event.preventDefault();
    console.log("Reached the delete");

    var idToArticle = $(this).attr("id");
    //console.log(idToArticle);
    API.deleteNote(idToArticle).then( function(data){
        console.log(data);
        window.location.reload();
    })
  
  };


// Save the new Note to the article
var saveNotesClick = function (event) {
    event.preventDefault();    
    console.log("REACHED IN add Notes ");
    var idToArticle = articleId;
    //console.log(data); // console.log(idToArticle);
    API.saveNote(idToArticle).then( function(data){
        console.log(data);
        window.location.reload();
    })
  };

// // Add event listeners to the submit and delete buttons
$(document).ready(function () {
    console.log("REached in button clicks ready");
    $(".delNotes").on("click", delNotesClick);
    $(".addNotes").on("click", addNotesClick);
    $("#btnSave").on("click", saveNotesClick);
  });
  