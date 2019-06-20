// Get references to page elements
var $addNotesBtn = $(".addNotes");
var $delNotesBtn = $(".delNotes");
var $articleId;

//console.log("In JS");
var API = {    
    saveNote: function (artId) {
        var notes ={};
        notes.title = $('#noteTitle').val();
        notes.note = $('#note').val();
        
        console.log("api/articles/" + artId)
        return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/articles/" + artId,
        data: JSON.stringify(notes)
      });
    },
  
    addNote: function () {
      return $.ajax({
        url: "api/note/" + artId,
        type: "GET"
      });
    },
  
    deleteArt: function (noteId) {
      return $.ajax({
        url: "api/articles/" + noteId,
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
var delArtClick = function (event) {
    //event.preventDefault();
    console.log("Reached the delete");

    var idToArticle = $(this).parent().attr('data-id');
    console.log(idToArticle);
    API.deleteArt(idToArticle).then( function(data){
        console.log(idToArticle);
        window.location.reload();
    })
  
  };


// Save the new Note to the article
var saveNotesClick = function (event) {
    event.preventDefault();    
    //console.log("REACHED IN add Notes ");
    var idToArticle = articleId;
    //console.log(notes); // console.log(idToArticle);
    API.saveNote(idToArticle).then( function(data){
        console.log(data);
        window.location.reload();
    })
  };

// // Add event listeners to the submit and delete buttons
$(document).ready(function () {
    //console.log("REached in button clicks ready");
    $(".delArticle").on("click", delArtClick);
    $(".addNotes").on("click", addNotesClick);
    $("#btnSave").on("click", saveNotesClick);
  });
  