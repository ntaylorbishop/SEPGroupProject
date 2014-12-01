function login(username) {
var url = "login.php";
var json = '{"username":' + username + '}';

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: true,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            var err = JSON.parse(result);
            if(err.error == false) {
                return true;
            }
            else {
                return false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Game over!");
        }
    });
}

function logout(username) {
var url = "logout.php";
var json = '{"username":' + username + '}';

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: true,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            var err = JSON.parse(result);
            if(err.error == false) {
                return true;
            }
            else {
                return false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}

function getUsersWaiting() {

}