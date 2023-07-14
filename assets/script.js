// This part of the code pulls the collaborators from the Github repository this will be used to compare against the entered
// Github username to determine if they pass or not
let usernameField = $('#username-input')
let passEl = $('#passed')
let failEl = $('#failed')
const collaboratorLogins = [];
const token = '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'
gitHubURL = "https://api.github.com/repos/BaBread/RealWinners/collaborators"

$.ajax({
    url: gitHubURL,
    method: "GET",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }
  })
  .done(function(collaborators) {
    // Extract the login names of the collaborators and store in the array
    collaborators.forEach(function(collaborator) {
      collaboratorLogins.push(collaborator.login);
    });
    
    // Display the list of collaborators
    console.log("Collaborators:", collaboratorLogins);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.error("Error fetching collaborators from GitHub API:", errorThrown);
  });


  let checkCollaborator = function() { 
    let isMatch = collaboratorLogins.includes(usernameField.val());

    if (isMatch) {
        passEl.addClass('show')
        passEl.removeClass('hide')
        failEl.addClass('hide')
        failEl.removeClass('show')

    }

    else {
        passEl.addClass('hide')
        passEl.removeClass('show')
        failEl.addClass('show')
        failEl.removeClass('hide')

    }



  }