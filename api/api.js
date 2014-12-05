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
            if(result.error === false) {
                $.cookie('user', username, { expires: 1, path: '/' });
                return true;
            }
            else {
                alert("\tUser already logged in with that name.\t\n\tPlease try another name.\t");
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
function send(user1, user2, user1Pieces, user2Pieces, user1CapturedPieces, user2CapturedPieces, userTime) {
    var url = "api/send.php";
    var json = '{"usernames": [{"user1": "' + user1 + '"},{"user2": "' + user2 + '"}],'
               + '\"user1Pieces\":' + user1Pieces + ',\"user2Pieces\":' + user2Pieces + ','
               + '\"user1CapturedPieces\":' + user1CapturedPieces + ',\"user2CapturedPieces\":' + user2CapturedPieces + ','
               + userTime + '}';
//    console.log(json);

    $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "json",
        async: false,
        contentType: 'application/json',
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}

function receive(user1, user2) {
    var url = "api/send.php";
    var json = 'user1=' + user1 + '&user2=' + user2;

    var info = $.ajax({
        type: 'GET',
        url: url,
        data: json,
        async: false,
        contentType: 'application/json',
        success: function(result,status,xhr) {
            alert(JSON.stringify(result));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
    return info.responseText;
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

function forfeitGame(user1, user2) {
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

function sendTime(username, user1Time, user2Time) {
    var url = "api/send_time.php";
    var json = "username=" + username + "&user1Time=" + user1Time + "&user2Time=" + user2Time;

    $.ajax({
        type: 'GET',
        url: url,
        data: json,
        async: false,
        contentType: 'application/json',
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}

function resetConnect(username) {
    var url = "api/reset_connect.php";
    var json = "username=" + username;

    $.ajax({
        type: 'GET',
        url: url,
        data: json,
        async: false,
        contentType: 'application/json',
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Something went wrong\n" + textStatus + ": " + errorThrown);
        }
    });
}