function loginBtn(username) {
	login(username);
	location.reload();
}

function logoutBtn(username) {
	logout(username);
	window.location = "index.php";
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        if($("#userN").is(":focus")) {
        	loginBtn($("#userN").val());
        }
    }
});