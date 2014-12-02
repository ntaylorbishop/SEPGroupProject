<!DOCTYPE html>
<html lang="en">
    <head>
	<meta charset="UTF-8">
	<meta name="robots" content="noindex">
	<title>Chess</Title>
	<link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/jquery.js"></script>
        <script src="js/jquery.cookie.js"></script>
	<script src="api/api.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
	<script src="js/style.js"></script>
        <script src="js/unload.js"></script>
	
    </head>
    <body background="background.png">
	<div id="head">
            <header>
		<div class="userPass">
                    <?php
			if(!isset($_COOKIE['user'])){
                            echo '<input type="text" id="userN" name="username" placeholder="UserName">';
                            echo '<input type="submit" value="Login" onclick="loginBtn(document.getElementById(\'userN\').value)">';
			} else {
                            echo "Welcome " . $_COOKIE['user'];
                            echo '<input type="submit" value="Logout" onclick="logoutBtn(\'' . $_COOKIE['user'] . '\')">'; 
			}
                    ?>
		</div>
            </header>
        </div>
        <div id="container">
            <div id="boardContainer">
                <div id="eChessClock">Timer Placeholder</div>
                <div id="uChessClock">Timer Placeholder</div>
                <input id="reset" type="button" onclick="resetMove()" value="Reset" />
                <input id="send" TYPE="button" onclick="sendMove()" value="Send" />
                <br/>
                <br/>
                <p id="uname"></p>
                <div id="endBtn">
                    <input id="end" type="button" value="Forfeit" />
                </div>
            </div>
        </div>
        <script>
            initGame(null);
        </script>
    </body>
</html>