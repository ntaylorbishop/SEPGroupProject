<html>


<head>
	<title>Waiting</title>
	<LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
	<script src="api/api.js"></script>
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


		<div class="mainBody2">

			

<div class="WaitingHeading">

<h1>  Waiting for another player to join ya ...</h1>

<img src="img/wait.jpg" />
</div>




		</div>

	</div>

</body>



</html>