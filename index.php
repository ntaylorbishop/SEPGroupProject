<html>
<head>
	<title>Chess Game</title>
	<LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
	<script src="js/jquery.js"></script>
	<script src="api/api.js"></script>
</head>
<body>


	<div class="wrapper">

		<header>

			<div class="userPass">

		
				<?php

					if(!isset($_COOKIE['user'])){


				?>
				<input type="text" id="userN" name="username" placeholder="UserName"> 
				<input type="submit" value="Login" onclick="login(document.getElementById('userN').value)" >
			
			<?php
				}else{

					echo "Welcome  " . $_COOKIE['user'] ;

				
			?>	

			<input type="submit" value="Logout" onclick="logout(document.getElementById('userN').value)" >

			<?php

				}
			?>
			

			</div>
			
		</header>


		<div class="mainBody">

			<div class="titleHere">
				<h1>Chess</h1>
			</div>

<div class="lobbiesList">

			<div class="lobby">
				Lobby1
			</div>

						<div class="lobby">
				Lobby2
			</div>

						<div class="lobby">
				Lobby3
			</div>

						<div class="lobby">
				Lobby4
			</div>

						<div class="lobby">
				Lobby5
			</div>

						<div class="lobby">
				Lobby6
			</div>

						<div class="lobby">
				Lobby7
			</div>

</div>


<div class="buttonToCreateGame">

	<div class="createButton">
		<a href="waiting.html" >Create a Game </a>
	</div>

</div>

		</div>

	</div>

</body>
</html>