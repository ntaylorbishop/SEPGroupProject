(function pollLobbies(){
    
    setTimeout(function(){
      var users = JSON.parse(getUsersWaiting());

      $('.lobbiesList').empty();

      for(var i = 0; i < users.length; i++) {
        $('.lobbiesList').append("<p>" + users[i].username + "</p>");
      }

      $('div.lobbiesList p').click(function() {
        startGame($(this).text(), $.cookie('user'));
      });
      pollLobbies();
    }, 1000);
})();