<!DOCTYPE html>
<html lang="en">
    <head>
	<meta charset="UTF-8">
	<meta name="robots" content="noindex">
	<title>Chess</Title>
	<link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="css/style.css">
    	<link href='http://fonts.googleapis.com/css?family=Audiowide' rel='stylesheet' type='text/css'>

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
                            header("location: index.php");
			} else {
                            echo "Welcome " . $_COOKIE['user'];
                            echo '<input type="button" id="logoutBtn" value="Logout" onclick="logoutBtn(\'' . $_COOKIE['user'] . '\')">'; 
			}
                    ?>
		</div>
            </header>
        </div>
        <div id="container">
            <p id="ename"></p>
            <div id="eChessClock">(Timer Placeholder)</div>
            <div id="eCapturedPieces"></div>
            <br />
            <div id="boardContainer">
                <input id="reset" type="button" onclick="resetMove()" value="Reset" />
                <input id="send" type="button" onclick="sendMove()" value="Send" />
                <br/>
                <div id="uCapturedPieces"></div>
                <div id="uChessClock">(Timer Placeholder)</div>
                <p id="uname"></p>
                <div id="endBtn">
                    <input id="end" type="button" value="Forfeit" onclick="forfeitGame(user1Name, user2Name)" />
                </div>
            </div>
        </div>
        <script>
            initGame(null);
        </script>
    </body>
</html>