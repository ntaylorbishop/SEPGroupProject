<html>
    <head>
	<title>Chess Game</title>
	<link href="favicon.ico" rel="icon" type="image/x-icon" />
	<LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
	<script src="js/jquery.js"></script>
    <script src="js/jquery.cookie.js"></script>
	<script src="api/api.js"></script>
	<script src="js/style.js"></script>
    <script src="js/pollLobbies.js"></script>
    <script src="js/lobbies.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Cinzel+Decorative' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Audiowide' rel='stylesheet' type='text/css'>

    </head>
    <body background="background.png">
        <div class="wrapper">
            <header>
		<div class="userPass">
                    <?php
			if(!isset($_COOKIE['user'])){
                            echo '<input type="text" id="userN" name="username" placeholder="UserName">';
                            echo '<input type="submit" id="loginBox" value="Login" onclick="loginBtn(document.getElementById(\'userN\').value)">';
			} else {
                            echo "Welcome " . $_COOKIE['user'];
                            echo '<input type="submit" value="Logout" onclick="logoutBtn(\'' . $_COOKIE['user'] . '\')">'; 
			}
                    ?>
		</div>
            </header>
            <div class="mainBody">
                <div class="titleHere">
                    <h1>Classic Chess Game</h1>
					<img class="mainimg" src="img/chess.jpg" alt="Chess">
		</div>
                <?php 
                    if(isset($_COOKIE['user'])) {
                        echo '<div class="lobbiesList"></div>';
                        echo '<div class="buttonToCreateGame">';
                        echo '<input type="button" id="createGame" value="Create Game" onclick="createLobby(\'' . $_COOKIE['user'] . '\')" />';
                        //echo '<div class="createButton"><a href="waiting.php" >Create a Game </a></div>';
                    }
                ?>
                </div>
            </div>
        </div>
    </body>
</html>