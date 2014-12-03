function login(username) {
var url = "api/login.php";
var json = '{"username":"' + username + '"}';
    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        success: function(result, status, xhr) {
            $.cookie('user', username, { expires: 1, path: '/' });
            if(result.error === false) {
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
var json = '{"username":"' + username + '"}';

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            $.cookie('user', username, { expires: -1, path: '/' });
            if(result.error === false) {
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
var url = "api/users_waiting.php";

    var users = $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
    return users.responseText;
}

function createLobby(username) {
    var url = "api/createGame.php";
    var json = '{"username":"' + username + '"}';

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: true,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            window.location = "waiting.php";
            if(result.error === false)
                return true;
            else
                return false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}

function startGame(user1, user2) {
    var url = "api/startGame.php";
    var json = '{"user1":"' + user1 + '", "user2":"' + user2 + '"}';

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            window.location.href='game.php';
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}

//Tyler's Stuff
function send(user1, user2, user1Pieces, user2Pieces, user1CapturedPieces, user2CapturedPieces) {
    var url = "api/send.php";
    var json = "user1=" + user1 + "&user2=" + user2;

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            alert(JSON.stringify(result));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}

function receive(user1, user2) {
    var url = "api/send.php";
    var json = '{"user1":"' + user1 + '", "user2":"' + user2 + '"}';

    $.ajax({
        type: 'GET',
        url: url,
        data: json,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            alert(JSON.stringify(result));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}
function getBasicInfo(username) {
    var url = "api/getBasicInfo.php";
    var json = 'username=' +  username;

    var info = $.ajax({
        type: 'GET',
        url: url,
        data: json,
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            //alert(JSON.stringify(result));
            //return result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
    return info.responseText;
}

function forfeitGame(user2) {
    alert("TEST");
    var user1 = $.cookie('user');
    alert(user1 + ", " + user2);
    var url = "api/endGame.php";
    var json = "user1=" + user1 + "&user2=" + user2;

    $.ajax({
        type: 'GET',
        url: url,
        data: json,
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            window.location = "index.php";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}