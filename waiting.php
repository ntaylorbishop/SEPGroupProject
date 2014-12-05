<html>
    <head>
	<title>Waiting</title>
	<link href="favicon.ico" rel="icon" type="image/x-icon" />
	<link REL="stylesheet" TYPE="text/css" HREF="css/style.css">
	<script src="js/jquery.js"></script>
    <script src="js/jquery.cookie.js"></script>
	<script src="api/api.js"></script>
	<script src="js/style.js"></script>
    <script src="js/waiting.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Piedra' rel='stylesheet' type='text/css'>
    </head>
    <body background="background.png">
        <div class="wrapper">
            <header>
                <div class="userPass">
                    <?php
			if(!isset($_COOKIE['user'])){
				header("location: index.php");
			} else {
                            echo "Welcome " . $_COOKIE['user'];
                            echo '<input type="submit" value="Logout" onclick="logoutBtn(\'' . $_COOKIE['user'] . '\')">'; 
			}
                    ?>
                </div>
            </header>
            <div class="mainBody2">
                <div class="WaitingHeading">
                    <?php
					   echo '<a href="index.php" > <input type="button" value="Go Back Home" onclick="resetConnect(\'' . $_COOKIE['user'] . '\')" /> </a>';
                    ?>
                    <h1>  Waiting for another player to join ya ...</h1>
					<h4> Warning: you might wait forever ...</h4>
                    <img src="img/wait.jpg" />
                </div>
            </div>
        </div>
    </body>
</html>