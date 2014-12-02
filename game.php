<!DOCTYPE html>
<HTML LANG="en">
<HEAD>
	<META CHARSET="UTF-8">
	<META NAME="robots" CONTENT="noindex">
	<TITLE>Chess</TITLE>
	<link href="favicon.ico" rel="icon" type="image/x-icon" />
	<SCRIPT TYPE="text/javascript" SRC="js/jquery.js"></SCRIPT>
	<SCRIPT TYPE="text/javascript" SRC="js/main.js"></SCRIPT>
	<LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
    <script src="js/jquery.cookie.js"></script>
	<script src="api/api.js"></script>
	<script src="js/style.js"></script>
	
</HEAD>
<BODY>
	<DIV ID="head">
	
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
		
		
	</DIV>
	<DIV ID="container">
		<DIV ID="boardContainer">
			<DIV ID="eChessClock">11:43 &#x25c0</DIV>
			<DIV ID="uChessClock">11:45</DIV>
			<BUTTON ID="reset" TYPE="button" onclick="resetMove()">Reset</BUTTON>
			<BUTTON ID="send" TYPE="button" onclick="sendMove()">Send</BUTTON>
			<br/><br/>
			<P ID="uname">Allegorithmic</P>
			<DIV ID="endBtn"><BUTTON ID="end" TYPE="button">Forfeit</BUTTON></DIV>
		</DIV>
		

	</DIV>
		
	</DIV>
	<SCRIPT>
  		initGame(null);
	</SCRIPT>
</BODY>
</HTML>