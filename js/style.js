function loginBtn(username) {
	login(username);
	location.reload();
}

function logoutBtn(username) {
	logout(username);
	window.location = "index.php";
}

function connectPlayers(user1, user2) {
	//Call to API connect players here
}

$(document).ready(function() {
	var users = JSON.parse(getUsersWaiting());

	for(var i = 0; i < users.length; i++) {
		$('.lobbiesList').append("<p>" + users[i].username + "</p>");
		$('div.lobbiesList p').click(function() {
   			window.location.href='game.html';
   			connectPlayers($('.lobbiesList p').text(), $.cookie('user'));
		});
	}

});