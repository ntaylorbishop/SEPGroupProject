<?php
require 'db_conn.php';

$username = $_COOKIE['user'];
$sql = "SELECT * FROM Users WHERE username=:username AND waitingToConnect = 0 AND inGame = 1";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() == 1) {
        echo 'true';
    } else {
    	echo 'false';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>
