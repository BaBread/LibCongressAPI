// This part of the code pulls the collaborators from the Github repository this will be used to compare against the entered
// Github username to determine if they pass or not
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
    



  }