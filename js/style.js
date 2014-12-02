function loginBtn(username) {
	login(username);
	location.reload();
}

function logoutBtn(username) {
	logout(username);
	location.reload();
}

$(document).ready(function() {
	var users = JSON.parse(getUsersWaiting());

	for(var i = 0; i < users.length; i++) {
		$('.lobbiesList').append("<p>" + users[i].username + "</p>");

	}

});