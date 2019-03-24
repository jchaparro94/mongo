//This grabs the articles as a json
$.get("/articles", function(data) {
    for (let i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br/>" + data[i].summary + "<br>" + data[i].link + "</p>");
    }
});

$(document).on("click", "textarea", function() {
    $("#notes").empty();

    let thisId = $(this).attr("data-id");

    //making the ajax call for the articles
    $.ajax({
        method: "GET",
        url: "/articles" + thisId
    }) //ability to add the note info to the page
    .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        // if note exists, grab it and place it in the title and body areas
        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});

//when the note is saved
$(document).on("click", "#savenote", function() {
    let thisId = $(this).attr("data-id");

    //POST request to change th note using whats entered in the input fields
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            //values taken from the title and body inputes
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {
        console.log(data);
        //empty the notes section after done
        $("#notes").empty();
    });
    //
    $("#titleinput").val();
    $("#bodyinput").val();
});