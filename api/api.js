function login(username) {
var url = "api/login.php";
var json = '{"username":"' + username + '"}';
    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: true,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            if(result.error == false) {
                return true;
            }
            else {
                alert(JSON.stringify(result));
                return false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + ":" + errorThrown);
        }
    });
}

function logout(username) {
var url = "api/logout.php";
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

function createGame() {

}