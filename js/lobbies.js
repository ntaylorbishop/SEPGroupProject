$(document).ready(function() {
	var users = JSON.parse(getUsersWaiting());

	for(var i = 0; i < users.length; i++) {
		$('.lobbiesList').append("<p>" + users[i].username + "</p>");
		$('div.lobbiesList p').click(function() {
   			window.location.href='game.php';
   			connectPlayers($('.lobbiesList p').text(), $.cookie('user'));
		});
	}

});