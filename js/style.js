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