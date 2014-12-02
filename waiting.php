<html>
    <head>
	<title>Waiting</title>
	<link REL="stylesheet" TYPE="text/css" HREF="css/style.css">
	<script src="js/jquery.js"></script>
        <script src="js/jquery.cookie.js"></script>
	<script src="api/api.js"></script>
	<script src="js/style.js"></script>
        <<script src="js/waiting.js"></script>
    </head>
    <body>
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
                    <h1>  Waiting for another player to join ya ...</h1>
                    <img src="img/wait.jpg" />
                </div>
            </div>
        </div>
    </body>
</html>