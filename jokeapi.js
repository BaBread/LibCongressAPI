// This part of the code pulls the JokeAPI 

$(document).ready(function() {
    var hintElement = $("#hint");
  
    // ajax request to the jokes api with safemode enabled for sfw jokes
    $.ajax({
      url: "https://v2.jokeapi.dev/joke/Misc,Programming?format=xml&safe-mode&type=single",
      method: "GET",
      success: function(response) {
        hintElement.text(response.joke);
      },
      error: function(xhr, status, error) {
        console.log("Error:", error);
        hintElement.text("Failed to fetch joke from the API.");
      }
    });
  });

