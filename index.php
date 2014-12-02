<html>
<head>
	<title>Chess Game</title>
	<LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
	<script src="js/jquery.js"></script>
        <script src="js/jquery.cookie.js"></script>
	<script src="api/api.js"></script>
	<script src="js/style.js"></script>
</head>
<body>


	<div class="wrapper">

		<header>

			<div class="userPass">

		
			<?php
			if(!isset($_COOKIE['user'])){
				echo '<input type="text" id="userN" name="username" placeholder="UserName">';
				echo '<input type="submit" value="Login" onclick="loginBtn(document.getElementById(\'userN\').value)">';
			}else{
				echo "Welcome " . $_COOKIE['user'];
				echo '<input type="submit" value="Logout" onclick="logoutBtn(\'' . $_COOKIE['user'] . '\')">'; 
			}
			?>
			

			</div>
			
		</header>


		<div class="mainBody">

			<div class="titleHere">
				<h1>Chess</h1>
			</div>

<div class="lobbiesList"></div>


<div class="buttonToCreateGame">

	<div class="createButton">
		<a href="waiting.html" >Create a Game </a>
	</div>

</div>

		</div>

	</div>

</body>
</html>